'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { editHabit } from "@/actions/habits/actions";
import type { Habit } from "@/lib/interface";

export default function HabitEditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [improvementAreas, setImprovementAreas] = useState(''); 
  const [completionFrequency, setCompletionFrequency] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchHabit = async () => {
      // Unwrap params using React.use()
      const id = await params.id; // Unwrap the Promise

      const { data: habit, error } = await supabase
        .from('habits')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching habit:', error);
        setError('Failed to load habit');
        setLoading(false);
        return;
      }

      setHabit(habit);
      setHabitName(habit.habit_name || '');
      setDescription(habit.description || '');
      setImprovementAreas(habit.improvement_areas || ''); 
      setCompletionFrequency(habit.completion_frequency || ''); 
      setLoading(false);
    };

    fetchHabit();
  }, [params]);

 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!habit) return;

      console.log('Submitting Habit:', {
        habitName,
        description,
        improvementAreas,
        completionFrequency,
      });

      console.log('habitName:', habitName);
      console.log('description:', description);
      console.log('improvementAreas:', improvementAreas);
      console.log('completionFrequency:', completionFrequency);

      await editHabit({
        ...habit,
        habit_name: habitName,
        description: description,
        improvement_areas: improvementAreas, 
        completion_frequency: completionFrequency, 
      });
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error updating habit:', error);
      setError('Failed to update habit');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Edit Habit</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="habitName">Habit Name</Label>
              <Input
                id="habitName"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Enter habit name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter habit description (optional)"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvementArea">Improvement Area</Label>
              <select
                id="improvementArea"
                value={improvementAreas}
                onChange={(e) => setImprovementAreas(e.target.value)}
                required
              >
                <option value="fitness">Fitness</option>
                <option value="finance">Finance</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="completionFrequency">Completion Frequency</Label>
              <select
                id="completionFrequency"
                value={completionFrequency}
                onChange={(e) => setCompletionFrequency(e.target.value)}
                required
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !habitName.trim() || !improvementAreas.trim() || !completionFrequency.trim()}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
