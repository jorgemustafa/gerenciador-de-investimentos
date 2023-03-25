
export const Routes = {
    // dash
    DashboardOverview: { path: "/" },
    // assets list
    AssetsList: {path: "/assets"},
    // extract
    Transactions: { path: "/transactions" },
    // add addAssets
    AddTransaction: { path: "/adicionar" },
    NewInvestment: { path: "/adicionar/novo-investimento" },
    ReInvestment: { path: "/adicionar/reinvestimento" },
    Sale: { path: "/adicionar/venda" },
    // settings
    Settings: { path: "/configuracoes" },
    // auth
    Signin: { path: "/login" },
    Signup: { path: "/cadastrar" },
    ResetPassword: { path: "/resetar-senha" },
    ResetPasswordConfirm: { path: "/password/reset/confirm/:uid/:token" },
    Activate: { path: "/activate/:uid/:token" },
    Google: { path: "/google" },
    // errors
    NotFound: { path: "/404" },
    ServerError: { path: "/500" },
};