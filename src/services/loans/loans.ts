import { Request, Response } from 'express'
import { Loans } from '../../models/loans'
import { User } from '../../models/users'
import { fail } from 'assert'

export const loanEligible = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await User.findOne({_id: id})
        if (!user) {
            return res.status(404).json({err: 'user not found'})
        }

        if (user.kycVerificationStatus === 'pending') { 
            return res.status(404).json({err: "KYC is yet to be approved"})
        } else if (user.kycVerificationStatus === 'rejected') {
            return res.status(404).json({err: "KYC is yet to be approved"})
        }

        const loans = await Loans.findOne({loanEligiblity: false})

        if(!loans) return res.status(404).json({err: 'Loan is uneligible'})

        if (user.kycVerificationStatus === 'approved') {
            return loans.loanEligiblity = true
        }
        await loans.save()
        return res.status(200).json({
            message : "You are eligible for the loan"
            
        })


    } catch (error) {}
}

export const loanApproval = async (req: Request, res: Response) => {}
