import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Building, User, CreditCard, Wallet, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import profileService from '@/services/profileService';

interface GovernmentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  user: any;
}

interface ProfileData {
  department: string;
  designation: string;
  bankAccount: string;
  walletAddress: string;
  ifscCode: string;
}

interface FormErrors {
  [key: string]: string;
}

const GovernmentProfileModal: React.FC<GovernmentProfileModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  user
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    department: '',
    designation: '',
    bankAccount: '',
    walletAddress: '',
    ifscCode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.bankAccount.trim()) {
      newErrors.bankAccount = 'Bank account number is required';
    } else if (formData.bankAccount.length < 9 || formData.bankAccount.length > 18) {
      newErrors.bankAccount = 'Bank account number must be between 9-18 digits';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC code format (e.g., SBIN0001234)';
    }

    if (formData.walletAddress && formData.walletAddress.length > 0) {
      if (formData.walletAddress.length < 26 || formData.walletAddress.length > 42) {
        newErrors.walletAddress = 'Invalid wallet address format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await profileService.completeGovernmentProfile(formData);
      
      toast({
        title: "Profile Completed! 🎉",
        description: "Your government profile has been successfully completed.",
      });
      
      onComplete();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            Complete Your Government Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Welcome Message */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900">Profile Completion Required</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Welcome, <strong>{user?.fullName}</strong>! To access all government features, 
                    please complete your profile with the required government details.
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      Government Role
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Department *
                </Label>
                <Input
                  id="department"
                  placeholder="e.g., Ministry of Energy"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={errors.department ? 'border-red-500' : ''}
                />
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department}</p>
                )}
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label htmlFor="designation" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Designation *
                </Label>
                <Input
                  id="designation"
                  placeholder="e.g., Subsidy Officer"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className={errors.designation ? 'border-red-500' : ''}
                />
                {errors.designation && (
                  <p className="text-sm text-red-500">{errors.designation}</p>
                )}
              </div>
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="bankAccount" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Government Bank Account Number *
              </Label>
              <Input
                id="bankAccount"
                placeholder="Enter government bank account number"
                value={formData.bankAccount}
                onChange={(e) => handleInputChange('bankAccount', e.target.value.replace(/\D/g, ''))}
                className={errors.bankAccount ? 'border-red-500' : ''}
                maxLength={18}
              />
              {errors.bankAccount && (
                <p className="text-sm text-red-500">{errors.bankAccount}</p>
              )}
            </div>

            {/* IFSC Code */}
            <div className="space-y-2">
              <Label htmlFor="ifscCode" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                IFSC Code *
              </Label>
              <Input
                id="ifscCode"
                placeholder="e.g., SBIN0001234"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                className={errors.ifscCode ? 'border-red-500' : ''}
                maxLength={11}
              />
              {errors.ifscCode && (
                <p className="text-sm text-red-500">{errors.ifscCode}</p>
              )}
            </div>

            {/* Wallet Address (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Blockchain Wallet Address <span className="text-sm text-muted-foreground">(Optional)</span>
              </Label>
              <Input
                id="walletAddress"
                placeholder="Enter blockchain wallet address for smart contracts"
                value={formData.walletAddress}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                className={errors.walletAddress ? 'border-red-500' : ''}
              />
              {errors.walletAddress && (
                <p className="text-sm text-red-500">{errors.walletAddress}</p>
              )}
              <p className="text-xs text-muted-foreground">
                This will be used for smart contract interactions on the blockchain
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                {loading ? 'Completing...' : 'Complete Profile'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GovernmentProfileModal;
