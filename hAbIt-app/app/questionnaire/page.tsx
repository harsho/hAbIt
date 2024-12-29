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
  CardFooter,
} from "@/components/ui/card";
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

export default function QuestionnairePage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [reminderFrequency, setReminderFrequency] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/signin");
        return; // Early return if user is null
      }

      // Check if user has already completed questionnaire
      const { data } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        router.push("/");
      }
    };

    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !date) return;

      const age = new Date().getFullYear() - date.getFullYear();

      const { error } = await supabase.from("user_preferences").insert({
        user_id: user.id,
        age: age,
        improvement_areas: selectedAreas,
        reminder_frequency: reminderFrequency,
      });

      if (error) throw error;
      
      router.push("/");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Help Us Get to Know You Better</h1>
          <p className="text-center text-gray-500">Please answer a few quick questions to personalize your experience</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {/* Birthday Selection */}
            <div className="space-y-2">
              <Label>What is your birthday?</Label>
              <DateInput
                value={date}
                onChange={setDate}
                placeholder="MM-DD-YYYY"
              />
            </div>

            {/* Improvement Areas */}
            <div className="space-y-2">
              <Label>What areas would you like to improve?</Label>
              <div className="grid grid-cols-2 gap-4">
                {improvementAreas.map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={area.id}
                      checked={selectedAreas.includes(area.id)}
                      onCheckedChange={(checked) => {
                        setSelectedAreas(
                          checked
                            ? [...selectedAreas, area.id]
                            : selectedAreas.filter((id) => id !== area.id)
                        );
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
              <Label>How often would you like to be reminded?</Label>
              <RadioGroup
                value={reminderFrequency}
                onValueChange={setReminderFrequency}
              >
                {reminderFrequencies.map((frequency) => (
                  <div key={frequency.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={frequency.id} id={frequency.id} />
                    <Label htmlFor={frequency.id}>{frequency.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!date || selectedAreas.length === 0 || !reminderFrequency || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
