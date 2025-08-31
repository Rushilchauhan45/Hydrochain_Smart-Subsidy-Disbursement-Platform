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
import { AlertTriangle, Factory, Building, CreditCard, Wallet, FileText, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import profileService from '@/services/profileService';

interface ProducerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  user: any;
}

interface ProfileData {
  organizationName: string;
  organizationId: string;
  walletAddress: string;
  bankAccount: string;
  ifscCode: string;
  kycDocumentUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

const ProducerProfileModal: React.FC<ProducerProfileModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  user
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    organizationName: '',
    organizationId: '',
    walletAddress: '',
    bankAccount: '',
    ifscCode: '',
    kycDocumentUrl: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData.organizationId.trim()) {
      newErrors.organizationId = 'Organization ID (GSTIN/License) is required';
    }

    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = 'Wallet address is required';
    }

    if (!formData.bankAccount.trim()) {
      newErrors.bankAccount = 'Bank account number is required';
    } else if (!/^\d{9,18}$/.test(formData.bankAccount)) {
      newErrors.bankAccount = 'Bank account must be 9-18 digits';
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
      
      await profileService.completeProducerProfile(profileData);
      
      toast({
        title: "Profile Completed Successfully! 🎉",
        description: "Your producer profile has been saved. You can now access all platform features.",
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Factory className="w-5 h-5 text-green-600" />
            </div>
            Complete Your Producer Profile
          </DialogTitle>
        </DialogHeader>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 mb-1">Profile Completion Required</h4>
                <p className="text-sm text-orange-700">
                  Welcome {user?.name}! To access producer features and apply for subsidies, 
                  please complete your organization profile with the required details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Organization Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className={errors.organizationName ? 'border-red-300' : ''}
                  placeholder="e.g., Green Energy Solutions Pvt Ltd"
                />
                {errors.organizationName && (
                  <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="organizationId">Organization ID (GSTIN/License) *</Label>
                <Input
                  id="organizationId"
                  type="text"
                  value={formData.organizationId}
                  onChange={(e) => handleInputChange('organizationId', e.target.value)}
                  className={errors.organizationId ? 'border-red-300' : ''}
                  placeholder="e.g., 29ABCDE1234F1Z5"
                />
                {errors.organizationId && (
                  <p className="text-red-500 text-sm mt-1">{errors.organizationId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-gray-900">Financial Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankAccount">Bank Account Number *</Label>
                <Input
                  id="bankAccount"
                  type="text"
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  className={errors.bankAccount ? 'border-red-300' : ''}
                  placeholder="e.g., 1234567890123456"
                />
                {errors.bankAccount && (
                  <p className="text-red-500 text-sm mt-1">{errors.bankAccount}</p>
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
              </div>
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Blockchain Information</h3>
            </div>
            
            <div>
              <Label htmlFor="walletAddress">Wallet Address *</Label>
              <Input
                id="walletAddress"
                type="text"
                value={formData.walletAddress}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                className={errors.walletAddress ? 'border-red-300' : ''}
                placeholder="e.g., 0x1234567890abcdef1234567890abcdef12345678"
              />
              {errors.walletAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Your blockchain wallet address for receiving subsidies
              </p>
            </div>
          </div>

          {/* KYC Document (Optional) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900">KYC Documentation</h3>
              <Badge variant="secondary">Optional</Badge>
            </div>
            
            <div>
              <Label htmlFor="kycDocumentUrl">KYC Document URL</Label>
              <Input
                id="kycDocumentUrl"
                type="url"
                value={formData.kycDocumentUrl}
                onChange={(e) => handleInputChange('kycDocumentUrl', e.target.value)}
                placeholder="https://example.com/your-kyc-document.pdf"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload your KYC documents to a cloud service and provide the URL
              </p>
            </div>
          </div>

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
              className="bg-green-600 hover:bg-green-700"
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

export default ProducerProfileModal;
