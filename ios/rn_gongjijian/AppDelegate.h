/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

#import "JPUSHService.h"
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif


static NSString *appKey = @"365089b0d017fb9b24e6944f";     //填写appkey
static NSString *channel = @"nil";    //填写channel   一般为nil
static BOOL isProduction = false;  //填写isProdurion  平时测试时为false ，生产时填写true

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
