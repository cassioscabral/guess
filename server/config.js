if (Meteor.isServer) {
    ServiceConfiguration.configurations.upsert(
        { service: "facebook" },
        {
            $set: {
                appId: "407778312753310",
                loginStyle: "popup",
                secret: "109198c63a6c40b7c65008975e91a0c7",
                requestPermissions: ['public_profile', 'email', 'user_about_me', 'user_actions.music', 'user_actions.video', 'user_actions.books', 'user_actions.fitness', 'user_likes', 'user_hometown', 'user_location', 'user_relationships', ]
            }
        }
    );
}
