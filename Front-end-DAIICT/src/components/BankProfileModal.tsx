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
import { AlertTriangle, Landmark, Building, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import profileService from '@/services/profileService';

interface BankProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  user: any;
}

interface ProfileData {
  bankName: string;
  branchName: string;
  ifscCode: string;
}

interface FormErrors {
  [key: string]: string;
}

const BankProfileModal: React.FC<BankProfileModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  user
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    bankName: '',
    branchName: '',
    ifscCode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!formData.branchName.trim()) {
      newErrors.branchName = 'Branch name is required';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Invalid IFSC code format (e.g., SBIN0001234)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const profileData = {
        ...formData,
        ifscCode: formData.ifscCode.toUpperCase()
      };
      
      await profileService.completeBankProfile(profileData);
      
      toast({
        title: "Profile Completed Successfully! 🎉",
        description: "Your bank profile has been saved. You can now access all platform features.",
        variant: "default",
      });
      
      onComplete();
    } catch (error: any) {
      toast({
        title: "Profile Completion Failed",
        description: error.message || "Failed to save your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-indigo-600" />
            </div>
            Complete Your Bank Profile
          </DialogTitle>
        </DialogHeader>

        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-indigo-800 mb-1">Profile Completion Required</h4>
                <p className="text-sm text-indigo-700">
                  Welcome {user?.name}! To participate in the subsidy disbursement network 
                  and facilitate secure transactions, please complete your bank profile.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bank Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Bank Information</h3>
            </div>
            
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className={errors.bankName ? 'border-red-300' : ''}
                placeholder="e.g., State Bank of India"
              />
              {errors.bankName && (
                <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
              )}
            </div>
          </div>

          {/* Branch Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-gray-900">Branch Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="branchName">Branch Name *</Label>
                <Input
                  id="branchName"
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                  className={errors.branchName ? 'border-red-300' : ''}
                  placeholder="e.g., Gandhi Nagar Branch"
                />
                {errors.branchName && (
                  <p className="text-red-500 text-sm mt-1">{errors.branchName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input
                  id="ifscCode"
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                  className={errors.ifscCode ? 'border-red-300' : ''}
                  placeholder="e.g., SBIN0001234"
                />
                {errors.ifscCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  11-character alphanumeric code
                </p>
              </div>
            </div>
          </div>

          {/* Information Note */}
          <Card className="border-gray-200 bg-gray-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Landmark className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Bank Responsibilities</h4>
                  <p className="text-sm text-gray-600">
                    As a participating bank, you'll facilitate secure subsidy disbursements, 
                    maintain transaction records, and ensure compliance with financial regulations 
                    in the Hydrochain ecosystem.
                  </p>
                </div>
              </div>
            </CardContent>
        </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Completing Profile...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BankProfileModal;
