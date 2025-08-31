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
import { AlertTriangle, Shield, Building, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import profileService from '@/services/profileService';

interface AuditorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  user: any;
}

interface ProfileData {
  organizationName: string;
  licenseNo: string;
  designation: string;
}

interface FormErrors {
  [key: string]: string;
}

const AuditorProfileModal: React.FC<AuditorProfileModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  user
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    organizationName: '',
    licenseNo: '',
    designation: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData.licenseNo.trim()) {
      newErrors.licenseNo = 'License number is required';
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
      await profileService.completeAuditorProfile(formData);
      
      toast({
        title: "Profile Completed Successfully! 🎉",
        description: "Your auditor profile has been saved. You can now access all platform features.",
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
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            Complete Your Auditor Profile
          </DialogTitle>
        </DialogHeader>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Profile Completion Required</h4>
                <p className="text-sm text-blue-700">
                  Welcome {user?.name}! To access auditor features and review subsidy applications, 
                  please complete your auditor profile with the required credentials.
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
            
            <div>
              <Label htmlFor="organizationName">Auditor Company/Organization Name *</Label>
              <Input
                id="organizationName"
                type="text"
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                className={errors.organizationName ? 'border-red-300' : ''}
                placeholder="e.g., ABC Auditing Services Pvt Ltd"
              />
              {errors.organizationName && (
                <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
              )}
            </div>
          </div>

          {/* Credential Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-gray-900">Professional Credentials</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenseNo">License/Registration Number *</Label>
                <Input
                  id="licenseNo"
                  type="text"
                  value={formData.licenseNo}
                  onChange={(e) => handleInputChange('licenseNo', e.target.value)}
                  className={errors.licenseNo ? 'border-red-300' : ''}
                  placeholder="e.g., AUD123456789"
                />
                {errors.licenseNo && (
                  <p className="text-red-500 text-sm mt-1">{errors.licenseNo}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Your professional auditor license number
                </p>
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  placeholder="e.g., Lead Auditor, Senior Auditor"
                />
                <Badge variant="secondary" className="mt-1 text-xs">Optional</Badge>
              </div>
            </div>
          </div>

          {/* Information Note */}
          <Card className="border-gray-200 bg-gray-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Auditor Responsibilities</h4>
                  <p className="text-sm text-gray-600">
                    As an auditor, you'll be responsible for reviewing subsidy applications, 
                    verifying compliance requirements, and ensuring transparency in the 
                    disbursement process.
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
              className="bg-blue-600 hover:bg-blue-700"
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

export default AuditorProfileModal;
