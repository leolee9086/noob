ginServer.Handle("POST", "/api/notification/pushMsg", model.CheckAuth, pushMsg)
ginServer.Handle("POST", "/api/notification/pushErrMsg", model.CheckAuth, pushErrMsg)
