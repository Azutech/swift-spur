import { Router } from 'express'
import { loanEligible, getOneLoan, getAllLoanUser} from '../../services/loans/loans'

export const loan = Router()

loan.get('/loaneligibity/:id', loanEligible)
loan.get('/loansOne/:loanid', getOneLoan)
loan.get('/loanUsers', getAllLoanUser )
