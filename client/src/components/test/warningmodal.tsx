

import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface TestAlertProps {
  open: boolean;
  onEnterFullscreen: () => void;
  onSubmitTest: () => void;
}

export function TestAlert({ open, onEnterFullscreen, onSubmitTest }: TestAlertProps) {
  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"  />
      
      {/* Alert Dialog */}
      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-md mx-auto">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-2xl font-bold">
              Fullscreen Required
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-base">
              Please re-enter fullscreen mode to continue the test.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button 
              onClick={onEnterFullscreen}
              className="w-full sm:w-auto"
            >
              Re-enter Fullscreen
            </Button>
            
            <Button 
              onClick={onSubmitTest}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              Submit Test & Exit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}