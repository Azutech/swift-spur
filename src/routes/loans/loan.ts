import { Router } from 'express'
import { loanEligible, getOneLoan } from '../../services/loans/loans'

export const loan = Router()

loan.get('/loaneligibity/:id', loanEligible)
loan.get('/loans/:loanid', getOneLoan)
