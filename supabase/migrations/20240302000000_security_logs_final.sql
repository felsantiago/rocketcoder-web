-- Create security_logs table
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_security_logs_type ON security_logs(type);
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_timestamp ON security_logs(timestamp);

-- Enable RLS
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert logs (even anonymous users)
CREATE POLICY "Allow anyone to insert logs"
  ON security_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read their own logs
CREATE POLICY "Allow users to read own logs"
  ON security_logs
  FOR SELECT
  TO authenticated
  USING (
    -- User can read their own logs
    user_id = auth.uid() OR
    -- Admin can read all logs
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create a function to get client IP (useful for server-side logging)
CREATE OR REPLACE FUNCTION get_client_ip()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('request.headers')::json->>'x-forwarded-for';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;