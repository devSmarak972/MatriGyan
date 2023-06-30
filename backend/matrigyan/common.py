def update_first_and_last_name(guser):
    userObj = guser.user
    userObj.first_name = guser.first_name[:30] 
    userObj.last_name = guser.last_name[:30]
    userObj.save()