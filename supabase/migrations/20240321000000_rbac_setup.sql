-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  assigned_by UUID NOT NULL REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_role CHECK (role IN ('admin', 'manager', 'user', 'guest'))
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
CREATE INDEX IF NOT EXISTS idx_user_roles_expires_at ON user_roles(expires_at);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON user_roles
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Only admins can assign roles"
  ON user_roles
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update roles"
  ON user_roles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete roles"
  ON user_roles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
  );

-- Create function to check if user has role
CREATE OR REPLACE FUNCTION has_role(p_user_id UUID, p_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = p_user_id
    AND role = p_role
    AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user's current role
CREATE OR REPLACE FUNCTION get_user_role(p_user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM user_roles
    WHERE user_id = p_user_id
    AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ORDER BY assigned_at DESC
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has permission
CREATE OR REPLACE FUNCTION has_permission(p_user_id UUID, p_resource TEXT, p_action TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_role TEXT;
BEGIN
  -- Get user's current role
  v_role := get_user_role(p_user_id);

  -- If no role found, user is a guest
  IF v_role IS NULL THEN
    v_role := 'guest';
  END IF;

  -- Check permission based on role
  RETURN CASE
    -- Admin has all permissions
    WHEN v_role = 'admin' THEN
      TRUE
    -- Manager has all permissions except user management
    WHEN v_role = 'manager' THEN
      CASE
        WHEN p_resource = 'users' AND p_action IN ('create', 'update', 'delete') THEN FALSE
        WHEN p_resource = 'permissions' AND p_action IN ('create', 'update', 'delete') THEN FALSE
        ELSE TRUE
      END
    -- Regular user has limited permissions
    WHEN v_role = 'user' THEN
      CASE
        WHEN p_resource = 'resources' AND p_action IN ('read', 'update') THEN TRUE
        WHEN p_resource IN ('users', 'permissions') AND p_action = 'read' THEN TRUE
        ELSE FALSE
      END
    -- Guest has only read access to resources
    WHEN v_role = 'guest' THEN
      p_resource = 'resources' AND p_action = 'read'
    ELSE
      FALSE
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to clean up expired roles
CREATE OR REPLACE FUNCTION cleanup_expired_roles()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM user_roles
  WHERE expires_at < CURRENT_TIMESTAMP;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_cleanup_expired_roles
  AFTER INSERT OR UPDATE ON user_roles
  EXECUTE FUNCTION cleanup_expired_roles();