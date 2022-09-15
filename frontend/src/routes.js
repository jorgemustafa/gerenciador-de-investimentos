
export const Routes = {
    // pages
    DashboardOverview: { path: "/" },
    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/billing" },
    Invoice: { path: "/invoice" },
    Signin: { path: "/login" },
    Signup: { path: "/signup" },
    ForgotPassword: { path: "/forgot-password" }, // nao vou usar
    ResetPassword: { path: "/reset-password" },
    ResetPasswordConfirm: { path: "/password/reset/confirm/:uid/:token" },
    Activate: { path: "/activate/:uid/:token" },
    Google: { path: "/google" },
    Lock: { path: "/lock" },
    NotFound: { path: "/404" },
    ServerError: { path: "/500" },

    // docs
    DocsOverview: { path: "/overview" },
    DocsDownload: { path: "/download" },
    DocsQuickStart: { path: "/quick-start" },
    DocsLicense: { path: "/license" },
    DocsFolderStructure: { path: "/folder-structure" },
    DocsBuild: { path: "/build-tools" },
    DocsChangelog: { path: "/changelog" },

    // components
    Accordions: { path: "/accordions" },
    Alerts: { path: "/alerts" },
    Badges: { path: "/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/breadcrumbs" },
    Buttons: { path: "/buttons" },
    Forms: { path: "/forms" },
    Modals: { path: "/modals" },
    Navs: { path: "/navs" },
    Navbars: { path: "/navbars" },
    Pagination: { path: "/pagination" },
    Popovers: { path: "/popovers" },
    Progress: { path: "/progress" },
    Tables: { path: "/tables" },
    Tabs: { path: "/tabs" },
    Tooltips: { path: "/tooltips" },
    Toasts: { path: "/toasts" },
    WidgetsComponent: { path: "/widgets" }
};