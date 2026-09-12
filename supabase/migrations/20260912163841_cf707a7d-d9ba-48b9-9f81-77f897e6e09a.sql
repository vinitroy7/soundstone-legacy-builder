CREATE TABLE public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  company_name TEXT CHECK (company_name IS NULL OR char_length(company_name) <= 120),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  email TEXT NOT NULL CHECK (char_length(email) <= 254),
  subject TEXT NOT NULL CHECK (char_length(subject) BETWEEN 2 AND 160),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_enquiries TO anon, authenticated;
GRANT ALL ON public.contact_enquiries TO service_role;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact enquiry"
ON public.contact_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');