import { Request, Response } from 'express'
import { Loans } from '../../models/loans'
import { User } from '../../models/users'

export const loanEligible = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ err: 'user not found' })
        }

        if (user.kycVerificationStatus === 'pending') {
            return res.status(404).json({ err: 'KYC is yet to be approved' })
        } else if (user.kycVerificationStatus === 'rejected') {
            return res.status(404).json({ err: 'KYC is yet to be approved' })
        }

        const loans = await Loans.findOne({ loanEligiblity: false })

        if (!loans) return res.status(404).json({ err: 'Loan is uneligible' })

        if (user.kycVerificationStatus === 'approved') {
            return await Loans.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        loanEligiblity: true,
                    },
                }
            )
        }
        await loans.save()
        return res.status(200).json({
            message: 'You are eligible for the loan',
        })
    } catch (err) {
        console.error(err)
        res.status(502).json({ err: 'Server error' })
    }
}

// export const loanApplied =async (req: Request, res: Response) => {
//         const
// }

// export const loanApproval = async (req: Request, res: Response) => {
//     const { id } = req.params

//     try {
//         const loans = await Loans.findOne({_id : id})

//         if (!loans) {
//             return res.status(404).json({err: 'loan not found' })
//         }
//         const loansEligibilty = await Loans.findOne({loanEligiblity : false })
//         if (loansEligibilty) {}
//     } catch (error) {

//     }
// }

export const getOneLoan = async (req: Request, res: Response) => {
    const { loanId } = req.params
    try {
        const getLoan = await Loans.findOne({ _id: loanId })

        if (!getLoan)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' })
        return res.status(200).json({
            success: true,
            message: 'Loan data has been retrieved',
            data: getLoan,
        })
    } catch (err: any) {
        console.error(err)
        return res.status(502).json({
            status: 'server error',
            message: err.message,
        })
    }
}

export const getAllLoanUser = async (req: Request, res: Response) => {
    try {
        const allLoans = await Loans.find().populate({path: 'userId'})
        if(!allLoans) {
            return res.status(404).json({err: 'Unable to perform this function'})
        }

        const loans = allLoans.map((item) => {
            const itemLoans = item.userId
            return itemLoans
        })

        return res.status(200).json({
            success: true,
            data: loans
        })
    } catch (err: any) {
        console.error(err)
        return res.status(501).json({
            success: false,
            status: 'server error',
            message: err.message
        })
    }
}
