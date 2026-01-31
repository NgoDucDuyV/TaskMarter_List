import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>UI ready ✅</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input placeholder="Type something..." />
          <Button>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}
