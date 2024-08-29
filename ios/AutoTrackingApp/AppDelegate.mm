#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <UserNotifications/UserNotifications.h>

#import <RNCPushNotificationIOS.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;

  
  // Request authorization for push notifications
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionSound + UNAuthorizationOptionBadge)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (granted) {
          dispatch_async(dispatch_get_main_queue(), ^{
              [[UIApplication sharedApplication] registerForRemoteNotifications];
          });
      }
  }];
  
  self.moduleName = @"AutoTrackingApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionBadge);
}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       didReceiveNotificationResponse:(UNNotificationResponse *)response
       withCompletionHandler:(void(^)(void))completionHandler
{
    [RNCPushNotificationIOS didReceiveNotificationResponse:response];
    completionHandler();
}



@end
