/**
 * Dialog Pattern
 *
 * This file documents the dialog pattern using shadcn/ui Dialog component
 * and color tokens from globals.css for styling.
 *
 * The Dialog component supports:
 * - title
 * - description
 * - footer actions
 *
 * Example usage:
 *
 * ```tsx
 * import {
 *   Dialog,
 *   DialogTrigger,
 *   DialogContent,
 *   DialogHeader,
 *   DialogTitle,
 *   DialogDescription,
 *   DialogFooter,
 * } from "@/components/ui/dialog";
 * import { Button } from "@/components/ui/button";
 *
 * export function ExampleDialog() {
 *   return (
 *     <Dialog>
 *       <DialogTrigger asChild>
 *         <Button>Open Dialog</Button>
 *       </DialogTrigger>
 *       <DialogContent className="bg-surface text-copy-primary border-border-default">
 *         <DialogHeader>
 *           <DialogTitle>Dialog Title</DialogTitle>
 *           <DialogDescription className="text-copy-secondary">
 *             Dialog description goes here.
 *           </DialogDescription>
 *         </DialogHeader>
 *
 *         {/* Dialog content */}
 *
 *         <DialogFooter>
 *           <Button variant="outline">Cancel</Button>
 *           <Button variant="default">Confirm</Button>
 *         </DialogFooter>
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 *
 * Color tokens available (from globals.css):
 * - Backgrounds: --bg-base, --bg-surface, --bg-elevated, --bg-subtle
 * - Borders: --border-default, --border-subtle
 * - Text: --text-primary, --text-secondary, --text-muted, --text-faint
 * - Accents: --accent-primary, --accent-ai
 * - States: --state-error, --state-success, --state-warning
 */

export const DialogPattern = {};
