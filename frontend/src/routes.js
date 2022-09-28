
export const Routes = {
    // pages
    DashboardOverview: { path: "/" },
    Transactions: { path: "/transactions" },
    AddAsset: { path: "/add" },
    Settings: { path: "/settings" },
    Signin: { path: "/login" },
    Signup: { path: "/signup" },
    ResetPassword: { path: "/reset-password" },
    ResetPasswordConfirm: { path: "/password/reset/confirm/:uid/:token" },
    Activate: { path: "/activate/:uid/:token" },
    Google: { path: "/google" },
    NotFound: { path: "/404" },
    ServerError: { path: "/500" },
};