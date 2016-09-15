window.Config = {
  APP_NAME: 'Neurosurgery',
  SERVER: 'https://nscontent.oit.ucla.edu',
  UPDATE_CHECK: {
    HOURS: 24
  },
  VERSION: '1.0.2',
  COPYRIGHT: {
    NAME: 'UC Regents',
    YEAR: '2015-2016'
  },
  FACILITIES: {
    LOCATIONS: [
      {id: 1, name: 'Westwood', latitude: 34.066467, longitude: -118.446497},
      {id: 2, name: 'Santa Monica', latitude: 34.0272007, longitude: -118.4872027}
    ],
    DEFAULT:
            {id: 1, name: 'Westwood', latitude: 34.066467, longitude: -118.446497}
  },
  GEOLOCATION: {
    OPTIONS: {
      HIGH_ACCURACY: true,
      MAX_AGE: 30000,
      TIMEOUT: 27000
    }
  },
  FACEBOOK: {
    NAME: 'Facebook',
    URI: {
      IOS: 'fb://',
      ANDROID: 'com.facebook.katana'
    },
    STORE: {
      IOS: 'https://itunes.apple.com/us/app/facebook/id284882215?mt=8',
      ANDROID: 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en'
    }
  },
  TWITTER: {
    NAME: 'Twitter',
    URI: {
      IOS: 'twitter://',
      ANDROID: 'com.twitter.android'
    },
    STORE: {
      IOS: 'https://itunes.apple.com/us/app/twitter/id333903271?mt=8',
      ANDROID: 'https://play.google.com/store/apps/details?id=com.twitter.android&hl=en'
    }
  },
  MYCHART: {
    NAME: 'myChart',
    URI: {
      IOS: 'epicmychart://',
      ANDROID: 'epic.mychart.android'
    },
    STORE: {
      IOS: 'https://itunes.apple.com/us/app/mychart/id382952264?mt=8',
      ANDROID: 'https://play.google.com/store/apps/details?id=epic.mychart.android&hl=en'
    },
    WEB: 'http://www.mychart.com/',
    APP: 'epicmychart://orgselect/orgID=806'
  },
  SOCIAL_MEDIA: {
    HEALTH: {
      FACEBOOK: {
        WEB: 'https://www.facebook.com/uclahealth',
        APP: {
          ANDROID:'fb://facewebmodal/f?href=https://www.facebook.com/uclahealth',
          IOS:'fb://profile/56790136798'
        }
      },
      TWITTER: {
        WEB: 'http://twitter.com/uclahealth',
        APP: 'twitter://user?screen_name=uclahealth'
      },
      WEB: 'http://www.uclahealth.org/Pages/Home.aspx'
    },
    NEUROSURGERY: {
      FACEBOOK: {
        WEB: 'http://www.facebook.com/UCLA-Neurosurgery-179782942050505/',
        APP: {
          ANDROID:'fb://facewebmodal/f?href=http://www.facebook.com/UCLA-Neurosurgery-179782942050505/',
          IOS:'fb://profile/179782942050505'
        }
      },
      WEB: 'http://neurosurgery.ucla.edu/',
      BROCHURE: 'http://issuu.com/uclaneurosurgery/docs/ucla_mag_med_res?e=9670806/6306195'
    }
  },
  PRIVACY: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  TERMS_AND_CONDITIONS: "<b>UCLA Department of Neurosurgery Patient Education Mobile Device Application</b><br/><br/><b>LICENSE AGREEMENT AND PRIVACY POLICY</b><br/><p>IMPORTANT: PLEASE READ THIS END USER LICENSE AGREEMENT AND PRIVACY POLICY (“EULA”) CAREFULLY. THE EULA IS BETWEEN YOU (“You” or “Your”) and THE REGENTS OF THE UNIVERSITY OF CALIFORNIA THROUGHT UCLA HEALTH SYSTEM (“We” or “Us” or “Our”) FOR THE PURPOSE OF PROVIDING PATIENT EDUCATION. BY DOWNLOADING THIS APPLICATION, YOU ACKNOWLEDGE THAT YOU AGREE TO BE BOUND BY THE TERMS OF THE EULA. IF YOU DO NOT AGREE TO ALL OF THE TERMS AND CONDITIONS SET FORTH BELOW, YOU ARE NOT PERMITTED TO USE THIS APPLICATION (“the Application”).</p><br/><b>License and Restrictions</b><br/><br/><p>We grant You a limited, non-exclusive, non-sub licensable, non-transferable license to use the Application, solely for Your personal non-commercial use in accordance with the instructions and documentation set forth in this EULA or any parts of the Application (collectively, the “Documentation.”) Unless expressly otherwise set forth in this EULA, You may not: (a) modify, translate or create derivative works of the Application or the Documentation; (b) decompile, reverse engineer or reverse assemble any portion of the Application or attempt to discover any source code or underlying ideas or algorithms of the Application; (c) sell, assign, sublicense, rent, lease, loan, provide, distribute or otherwise transfer all or any portion of the Application or the Documentation; (d) make, have made, reproduce or copy the Application or the Documentation; (e) remove or alter any trademark, logo, copyright or other proprietary notices associated with the Application or the Documentation, or make available the Application without reproducing all proprietary notices; (f) cause or permit any other party to do any of the foregoing; or (g) engage in any conduct that, directly or indirectly, violates the terms of this EULA or has a harmful impact on the Application.</p><br/><b>Use of the Application</b><br/><br/><p>We reserve the right to terminate Your use of the Application at any time, with or without any reason. The Application is provided solely for informational purposes and reliance on the Application is purely at your own risk. UCLA Health does not warrant the accuracy or completeness of the content contained in the Application. You will be solely responsible for YOUR use of and reliance on the content contained in the Application AND FOR ALL decisions or actions resulting from YOUR use of the Application. The Application is not a substitute for the medical judgment of a physician or other licensed health care professional. The Application is not intended to replace or overrule the judgment or diagnosis of a physician or licensed health care professional and must not be used as the basis for making any diagnosis or treatment recommendation.</p><br/><b>Ownership</b><br/><br/><p>The Application and the Documentation, including all images, photographs, animations, text and other audiovisual materials, and any and all patents, copyrights, moral rights, trademarks, trade secrets and any other form of intellectual property rights recognized in any jurisdiction, including applications and registrations for any of the foregoing embodied therein are owned by Us or Our licensors. The Application and the Documentation are licensed, and not sold, to You for use only under the terms of this EULA. We reserve all rights not expressly granted to You. You will not use publicly for publicity, promotion, or otherwise, any logo, name, trade name, service mark, or trademark belonging to Us or Our affiliates or licensors without Our prior, written, express consent.</p><br/><b>Term and Termination</b><br/><br/><p>The effective date of this EULA is the date on which you install the Application. This EULA is effective until terminated. You may terminate this EULA at any time by deleting the Application from your device. This EULA will terminate immediately without notice from Us if you fail to comply with any provision of this EULA. Upon termination you must delete the Application from your tablet, phone and/or other device on which the Application is installed.</p><br/><b>DISCLAIMER OF WARRANTIES</b><br/><br/><p>THE APPLICATION IS PROVIDED TO YOU ON AN “AS IS” OR “AS AVAILABLE” BASIS WITHOUT ANY REPRESENTATIONS, WARRANTIES, COVENANTS OR CONDITIONS OF ANY KIND. WE AND OUR SUPPLIERS DO NOT WARRANT THAT ANY OF THE APPLICATION WILL BE FREE FROM ALL BUGS, ERRORS, OR OMISSIONS. WE AND OUR SUPPLIERS DISCLAIM ANY AND ALL OTHER WARRANTIES AND REPRESENTATIONS (EXPRESS OR IMPLIED, ORAL OR WRITTEN) WITH RESPECT TO THE APPLICATION WHETHER ALLEGED TO ARISE BY OPERATION OF LAW, BY REASON OF CUSTOM OR USAGE IN THE TRADE, BY COURSE OF DEALING OR OTHERWISE, INCLUDING ANY AND ALL (A) WARRANTIES OF MERCHANTABILITY, (B) WARRANTIES OF FITNESS OR SUITABILITY FOR ANY PURPOSE (WHETHER OR NOT WE KNOW, HAVE REASON TO KNOW, HAVE BEEN ADVISED, OR ARE OTHERWISE AWARE OF ANY SUCH PURPOSE), AND (C) WARRANTIES OF NONINFRINGEMENT OR CONDITION OF TITLE, (D) WARRANTIES THAT THE APPLICATION WILL OPERATE WITHOUT INTERRUPTION OR ERROR. YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE RELIED ON NO WARRANTIES. THIS DISCLAIMER AND EXCLUSION WILL APPLY EVEN IF THE EXPRESS WARRANTY SET FORTH ABOVE FAILS OF ITS ESSENTIAL PURPOSE.</p><br/><b>LIMITATION OF LIABILITY</b><br/><br/><p>IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY OTHER PARTY FOR ANY LOSS OF PROFITS, LOSS OF USE, LOSS OF REVENUE, LOSS OF GOODWILL, ANY BODILY OR MENTAL INJURY, INTERRUPTION OF BUSINESS, OR FOR ANY INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND (INCLUDING, BUT NOT LIMITED TO, PHYSICAL LOSSES, MENTAL LOSSES OR ANY FINANCIAL LOSSES) ARISING OUT OF OR IN CONNECTION WITH THE APPLICATION, OR YOUR USE OF THE APPLICATION, REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OR ARE OTHERWISE AWARE OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL CUMULATIVE LIABILITY (INCLUDING, BUT NOT LIMITED TO, ANY LIABILITY WITH RESPECT TO ANY LOSS OF PROFITS, LOSS OF USE, LOSS OF REVENUE, LOSS OF GOODWILL, ANY BODILY OR MENTAL INJURY, INTERRUPTION OF BUSINESS, OR FOR ANY INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND [INCLUDING, BUT NOT LIMITED TO, PHYSICAL LOSSES, MENTAL LOSSES OR ANY FINANCIAL LOSSES] ARISING OUT OF OR IN CONNECTION WITH THE APPLICATION OR YOUR USE OF THE APPLICATION, TO YOU OR ANY THIRD PARTY, WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE) WILL NOT EXCEED THE AMOUNT PAID BY YOU TO US. MULTIPLE CLAIMS WILL NOT EXPAND THIS LIMITATION. CERTAIN LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.</p><br/><b>Disclaimer of Tort Liability</b><br/><br/><p>The foregoing remedies are EXCLUSIVE, and You waive and release all other warranties, obligations, and liabilities of Us and all other remedies, claims, and rights that You may have relating in any way to the Application covered by the terms of this EULA, whether arising from contract, warranty, strict liability or tort or from Our negligence, tort, or other fault, including claims for loss of or damage to the Application.</p><br/><b>Indemnification</b><br/><br/><p>You will indemnify, defend and hold harmless Us, Our affiliates, and Our and their respective trustees, officers, directors, agents, independent contractors, employees, consultants, service providers, and applicable third parties (such as licensors and partners) (collectively, the “Imdemnified Parties”) from and against any actual or threatened suit, demand or claims, damages, costs, liabilities and expenses (including, but not limited to, damage awards, settlement amounts, and reasonable attorneys' fees) brought against any Indemnified Parties, arising out of or relating to: (a) Your use of the Application; (b) Your conduct; (c) Your failure to perform Your obligations under this EULA (including, but not limited to, Your violation of this EULA); (d) Your violation of the rights of any third party; and/or (e) use of the Application by anyone else on Your device.</p><br/><b>General</b><br/><br/><p>This EULA constitutes the entire agreement between the parties and supersedes any and all prior proposals, agreements or communications, written or oral, of the parties with respect to the subject matter hereof. This EULA may not be modified, altered or amended, except by written instrument executed by both parties. You may not assign or otherwise transfer this EULA to anyone. All disputes arising from or relating to this EULA will be within the exclusive jurisdiction of the state and/or federal courts located within California and the parties hereby consent to such exclusive jurisdiction and waive objections to venue therein. The parties hereby disclaim the application of the 1980 U.N. Convention on Contracts for the International Sale of Goods. If any provision of this EULA is found invalid or unenforceable by an arbitrator or a court of competent jurisdiction, the remaining portions will remain in full force and effect, and the invalid provision will be partially enforced to the maximum extent permitted by law to effectuate the purpose of this EULA. If you use any third party services that are accessed through or embedded in this application, your use of those services will be governed by the terms of use of those services.</p><br/><b>Google Maps</b><br/><br/><p>This application incorporates location-based map features provided by Google Maps. Your use of these features is governed by Google’s Terms of Use. Use of real-time route guidance features is at your sole risk. Location data may not be accurate.</p><br/><b>Privacy Policy</b><br/><br/><p>Your privacy is important to us. Below is our Privacy Policy describing what information is collected by this application and the manner in which it is used.</p><br/><b>Information Collected by This Application</b><br/><br/><p>To use this Application, you have the option of entering the date of your scheduled neurosurgery procedure. This date and any notes you choose to enter into the Application will be stored securely within the Application on your device and will not be collected by UCLA Health. Depending upon your device settings, reminder notifications may be automatically synchronized with your calendar for your convenience.</p><br/><b>Third Party Services</b><br/><br/><p>If you use the Google Maps feature, the collection and use of information through the use of this feature is governed by Google's Privacy Policy. If you use any other third party services that are embedded in, or accessed through, this application, including, but not limited to, Twitter, the collection and use of information in connection with that service is subject to that service's Privacy Policy. If you log in to your UCLA MyChart account, the UCLA MyChart Application will also collect your login information for the purposes of verifying your identity.</p>",
  //this rate is in miliseconds
  REFRESH_RATE: 86400000,
};