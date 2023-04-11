import { Router } from 'express'
import { loanEligible } from '../../services/loans/loans'

export const loan = Router()

loan.get('/loaneligibity/:id', loanEligible)
