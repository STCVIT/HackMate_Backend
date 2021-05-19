class ResourceCreatedSuccess{
    constructor(){
        this.statusCode = 201
        this.message = "Resource Created"
    }
}

class ResourceDeletedSuccess{
    constructor(){
        this.statusCode = 201
        this.message = "Resource Deleted"
    }
}

module.exports = {
    ResourceCreatedSuccess,
    ResourceDeletedSuccess
}