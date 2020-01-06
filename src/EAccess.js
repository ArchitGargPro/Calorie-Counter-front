const EAccess = {
        ANONYMOUS: 0,
        USER: 1,
        MANAGER: 2,
        ADMIN: 3
};

const Accesses = {
                ANONYMOUS: 'ANONYMOUS',
                USER: 'USER',
                MANAGER:'MANAGER',
                ADMIN: 'ADMIN',
};

const ELogInStatus = {
    UNATTEMPTED : 'UNATTEMPTED',
    ATTEMPTED: 'ATTEMPTED',
    LOGGEDIN : 'LOGGEDIN',
};



const ETables = {
    USER: 'USER',
    MEAL: 'MEAL',
};

export {
        EAccess,
        Accesses,
        ETables,
        ELogInStatus
};
