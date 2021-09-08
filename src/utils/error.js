class NotFoundError extends Error{
    constructor(){
        super()
        this.statusCode = 404
        this.message = 'Not Found'
    }
}

class AuthenticationError extends Error{
    constructor(){
        super()
        this.statusCode = 401
        this.message = 'Not Authenticated'
    }
}

class BadRequestError extends Error{
    constructor(){
        super()
        this.statusCode = 400
        this.message = 'Bad Request'
    }
}

class TeamFullError extends Error{
    constructor(){
        super()
        this.statusCode = 403
        this.message = 'Team is Full'
    }
}

class DuplicateTeamEntryError extends Error{
    constructor(){
        super()
        this.statusCode = 403
        this.message = 'Duplicate Entry in Team is not allowed'
    }
}

class EmailUnauthorizedError extends Error{
    constructor(){
        super()
        this.statusCode = 401
        this.message = 'Please Verify Your Email Address'
    }
}

class DuplicateTeamHackError extends Error{
    constructor(){
        super()
        this.statusCode = 403
        this.message = 'Already Going to the same Hack.'
    }
}

class SchemaValidationError extends Error{
    constructor(){
        super()
        this.statusCode = 400
        this.message = 'Please Specify All required fields'
    }
}

class DuplicateEntryError extends Error{
    constructor(){
        super()
        this.statusCode = 409
        this.message = 'Indexing error'
    }
}

class InvalidUpdatesError extends Error{
    constructor(){
        super()
        this.statusCode = 400
        this.message = 'Invalid Updates'
    }
}

class ClaimNotSetError extends Error{
    constructor(){
        super()
        this.statusCode = 418
        this.message = 'Claim Not Set'
    }
}

class LoginNotAllowedError extends Error{
    constructor(){
        super()
        this.statusCode = 403
        this.message = 'Login Not Allowed'
    }
}

module.exports = {
    NotFoundError,
    AuthenticationError,
    BadRequestError,
    TeamFullError,
    DuplicateTeamEntryError,
    EmailUnauthorizedError,
    DuplicateTeamHackError,
    SchemaValidationError,
    DuplicateEntryError,
    InvalidUpdatesError,
    LoginNotAllowedError,
    ClaimNotSetError
}