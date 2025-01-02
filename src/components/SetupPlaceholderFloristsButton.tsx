import { Button } from "@/components/ui/button";
import { setupPlaceholderFlorists } from "@/utils/setupPlaceholderFlorists";

export const SetupPlaceholderFloristsButton = () => {
  return (
    <Button 
      onClick={setupPlaceholderFlorists}
      variant="outline"
      className="fixed bottom-4 right-4 z-50"
    >
      Setup Placeholder Florists
    </Button>
  );
};