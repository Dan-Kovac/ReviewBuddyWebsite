import { ReviewsScreen } from "@/components/product-visual";

/**
 * public/images/reviews-breakdown.png says "prevent negative reviews".
 * That claim must not ship, so this draws the reviews screen instead of
 * using that file.
 */
export function PlatformScreen() {
  return <ReviewsScreen />;
}
