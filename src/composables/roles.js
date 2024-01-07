// check if the current user role has access to the page

const authLevel = {"Visitor": 0,
                   "ROLE_USER": 1,
                   "ROLE_STAFF": 2,
                   "ROLE_ADMIN": 3
}

export function sufficientRole(min_req_role, role) {
    /*inputs: role: actual user role, min_req_role minium role that is required to access this page
      returns: bool 
    */
    const min_level = authLevel[min_req_role]
    const level = authLevel[role]
    if (level < min_level){
        return false;
    }
    return true;
}
