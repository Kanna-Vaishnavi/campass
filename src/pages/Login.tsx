import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowRight, User, Mail, Phone } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { z } from 'zod';

const loginSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Please enter a valid Gmail address').refine(
    (email) => email.toLowerCase().endsWith('@gmail.com'),
    'Please use a Gmail address'
  ),
  phone: z.string().trim().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { updateProfile, setIsAuthenticated } = useUser();
  const [formData, setFormData] = useState<LoginFormData>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: keyof LoginFormData, value: string) => {
    try {
      loginSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleChange = (field: keyof LoginFormData, value: string) => {
    const sanitizedValue = field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    if (touched[field]) {
      validateField(field, sanitizedValue);
    }
  };

  const handleBlur = (field: keyof LoginFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const isFormValid = () => {
    try {
      loginSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ fullName: true, email: true, phone: true });
    
    // Validate all fields
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Partial<LoginFormData> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof LoginFormData;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // Save user data to context
    updateProfile({
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone,
    });
    
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto gradient-primary rounded-xl p-3 w-fit">
            <GraduationCap className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Welcome to PlacePrep</CardTitle>
            <CardDescription className="mt-2">
              Sign in to access your personalized placement preparation dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                className={errors.fullName && touched.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && touched.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Gmail ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@gmail.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={errors.email && touched.email ? 'border-destructive' : ''}
              />
              {errors.email && touched.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={errors.phone && touched.phone ? 'border-destructive' : ''}
                maxLength={10}
              />
              {errors.phone && touched.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-primary gap-2 mt-6" 
              disabled={!isFormValid()}
            >
              Continue to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              All fields are mandatory. Your information is securely stored.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
