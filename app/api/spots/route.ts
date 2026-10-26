import { getSetupSpots } from "@/lib/spots";

export async function GET() {
  const spots = await getSetupSpots();
  if (!spots) {
    return Response.json({ ok: false }, { status: 503 });
  }
  return Response.json(spots);
}
