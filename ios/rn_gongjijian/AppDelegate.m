/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "AlipayModule.h"


#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

//NSURL *jsCodeLocation;
//#ifdef DEBUG
////开发包
//jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//#else
////离线包
//jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
//#endif

// ios 8.x or older
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  [AlipayModule handleCallback:url];
  return YES;
  
  return [RCTLinkingManager application:application openURL:url
                            sourceApplication:sourceApplication annotation:annotation];
}

// ios 9.0+
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  
#ifdef DEBUG

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else

  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"rn_gongjijian"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:rootViewController];
  navigationController.navigationBar.hidden = YES;
  
  self.window.rootViewController = navigationController;

  
  return YES;
}

@end
