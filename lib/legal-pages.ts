/**
 * Draft legal pages stay on local and Vercel preview so they can be reviewed.
 * Production returns 404 while the draft flag is on.
 */
export function legalPagesPublic(draft: boolean, vercelEnv: string | undefined): boolean {
  if (!draft) {
    return true;
  }
  return vercelEnv !== "production";
}
