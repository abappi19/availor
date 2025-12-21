/**
 * Main Conversation Screen (Home Tab)
 * Shown after onboarding is complete
 */

import { ConversationScreen } from '@/features/conversation';

export default function HomeScreen() {
  // useEffect(() => {
  //   AsyncStorage.getItem('hasCompletedOnboarding').then((value) => {
  //     if (!value) {
  //       router.push('/onboarding');
  //     }
  //   });
  // }, []);
  return <ConversationScreen />;
}
