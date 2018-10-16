var Roles = require('../models/auth/Role')

const canAccess = function(rolePerms = {}) {
    return function(req, res, next) {
        if(!req.user) {
            console.log('User is not authenticated and cannot access path!')
            res.status(403).send('Unable to view. Not logged in.');
        } else {
            console.log('User is logged in.')
            hasPermission(rolePerms, req.user, res, next)
            if(Object.keys(rolePerms).length !== 0){
                
            }
            
        }
    }
}
var hasPermission = function(rolePerms, user, res, next) {
    let requiredRoles = (rolePerms.hasOwnProperty('roles')?rolePerms.roles:[])
    let requiredPermissions = (rolePerms.hasOwnProperty('permissions')?rolePerms.permissions:[])
    let authorized = false;
    Roles.find({},(err, roles) => {
        if(true){
            //we have a list of roles allowed to access route.
            //we need to see if user's role is in list
            
            //first get role that matches userrole
            let userRole = roles.filter( (role) => {
                console.log(role._id.toString())
                return role._id.toString() === user.role
            })
            userRole = userRole[0]
            if(requiredRoles.indexOf(userRole.name) > -1){ // || userRole.name === 'Admin'
                //User's role present in list of roles
                console.log('User has access!')
                authorized = true;
            } else {
                console.log(`User's role '${userRole.name}' not in list of allowed roles:\n  ${requiredRoles}\nNeed to check permissions next`)
                //Build a list of all permissions owned by user's role
                if(requiredPermissions.length > 0){
                    let userPermissions = []
                    userPermissions = userPermissions.concat(userRole.permissions);
                    if(userRole.inherits != ''){
                        //User's role inherits the permissions of a lesser role.
                        //Need to get parent role permissions
                        let findRole = userRole.inherits;
                        for(let i = 0; i < 1; i++){
                            console.log('looking for role ', findRole)
                            let selectedRole = roles.filter( (role) => {
                                return role._id.toString() === findRole
                            })[0]
                            console.log('Found role ', selectedRole.name, '. Adding permissions:\n', selectedRole.permissions)
                            userPermissions = userPermissions.concat(selectedRole.permissions)
                            console.log('loop ran')
                            //Check if role inherits another role
                            if(selectedRole.inherits != ''){
                                //Decrement counter to make loop run again
                                i--
                                console.log(i)
                                findRole = selectedRole.inherits;
                            }
                        }
                    }
                    console.log(user.username, 'has permissions:\n',userPermissions)
                    //Now we have all the permissions the user has access to.
                    //First, check if user has the * permission (all permissions)
                    if(userPermissions.indexOf('99') != -1){
                        authorized = true;
                    } else {
                        console.log('Checking if user has ',requiredPermissions.length, ' permissions.')
                        //User dows not have *, check to make sure that ALL supplied permissions match
                        let fail = false;
                        for(let i = 0; i<requiredPermissions.length; i++){
                            if(userPermissions.indexOf(requiredPermissions[i]) == -1){
                                console.log('User does not have ',requiredPermissions[i], ' permission. Aborting.')
                                fail = true;
                                break;
                            }
                        }
                        if(!fail){
                            authorized = true;
                        }
                    }
                } else {
                    //No permissions supplied.
                    console.log('User\'s role is not allowed to access this resource.')
                    authorized = false;
                }
                
            }
            if(authorized){
                console.log('User is authorized');
                next()
            } else {
                console.log('User is not authorized');
                // res.redirect(403)
                res.status(403).send('You are not authorized.')
            }
        }
    })
}

module.exports = canAccess;