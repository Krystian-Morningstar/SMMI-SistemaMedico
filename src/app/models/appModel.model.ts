import { signal } from "@angular/core"
import { Router } from "@angular/router";

    var isLogged = signal(false)
    var userTapOpened = signal(false)

    function getLoggedStatus(): boolean{
        return isLogged()
    }

    function getUserTabStatus(): boolean{
        return userTapOpened()
    }

    function login(router: Router): void{
        isLogged.set(true)
        router.navigate(['/inicio']);
    }

    function logout(){
        isLogged.set(false)
    }

    function switchTab(){
        userTapOpened.set(!userTapOpened())
    }

    export {getLoggedStatus, getUserTabStatus, login, logout, switchTab}