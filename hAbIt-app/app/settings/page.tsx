'use client';

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateInput } from "@/components/ui/date-input";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const improvementAreas = [
  { id: "fitness", label: "Fitness" },
  { id: "finance", label: "Finance" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
];

const reminderFrequencies = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userResponses, setUserResponses] = useState<any>(null);
  const supabase = createClient();

  // Fetch user and their responses
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
        return;
      }
      setUser(user);
      
      // Fetch user's questionnaire responses
      const { data: responses, error: responsesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (!responsesError && responses) {
        setUserResponses(responses);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const updateResponses = async (field: string, value: any) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_preferences')
      .update({ [field]: value })
      .eq('user_id', user.id);

    if (!error) {
      setUserResponses((prev: any) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Settings</h1>
          <p className="text-center text-gray-500">Update your preferences</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {userResponses && (
            <>
              {/* Birthday Selection */}
              <div className="space-y-2">
                <Label>Birthday</Label>
                <DateInput
                  value={userResponses.birthday ? new Date(userResponses.birthday) : undefined}
                  onChange={(date) => {
                    if (date) {
                      const age = new Date().getFullYear() - date.getFullYear();
                      updateResponses('age', age);
                      updateResponses('birthday', date.toISOString());
                    }
                  }}
                  placeholder="MM-DD-YYYY"
                />
              </div>

              {/* Improvement Areas */}
              <div className="space-y-2">
                <Label>Areas you want to improve</Label>
                <div className="grid grid-cols-2 gap-4">
                  {improvementAreas.map((area) => (
                    <div key={area.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={area.id}
                        checked={userResponses.improvement_areas?.includes(area.id)}
                        onCheckedChange={(checked) => {
                          const newAreas = checked
                            ? [...(userResponses.improvement_areas || []), area.id]
                            : (userResponses.improvement_areas || []).filter((id: string) => id !== area.id);
                          updateResponses('improvement_areas', newAreas);
                        }}
                      />
                      <label
                        htmlFor={area.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {area.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reminder Frequency */}
              <div className="space-y-2">
                <Label>Reminder Frequency</Label>
                <RadioGroup
                  value={userResponses.reminder_frequency || ""}
                  onValueChange={(value) => updateResponses('reminder_frequency', value)}
                >
                  {reminderFrequencies.map((frequency) => (
                    <div key={frequency.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={frequency.id} id={frequency.id} />
                      <Label htmlFor={frequency.id}>{frequency.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                className="w-full"
                onClick={() => router.push('/')}
              >
                Back to Dashboard
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
