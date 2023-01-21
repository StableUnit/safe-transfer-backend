import { Response, Request } from "express"

import Transfer, { ITransfer } from "../models/transfer"
import volume from "../models/volume"
import Volume, { IVolume } from "../models/volume"
import { getCryptoPrice } from "./price"


const addTransfer = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<ITransfer, "txHash" | "chainId">

		const transfer: ITransfer = new Transfer({
			txHash: body.txHash,
			chainId: body.chainId,
			detailsFetched: false,
		})

		// now, let's fetch more data about the transfer to update statitics
		transfer.tokenSymbol = req.body?.tokenSymbol;
		transfer.tokenAmount = req.body?.tokenAmount;
		if (transfer.tokenAmount && transfer.tokenSymbol) {
			const tokenPrice = await getCryptoPrice(transfer.tokenSymbol);
			if (tokenPrice) {
				transfer.valueUsd = tokenPrice * Number(transfer.tokenAmount);
				transfer.detailsFetched = true;
				const newTranfer: ITransfer = await transfer.save();

				// update statitics
				let volume: IVolume | null = await Volume.findOne();
				if (!volume) {
					volume = new Volume({
						totalTransferedUsd: 0,
						totalApprovedUsd: 0
					});
				}
				volume.totalTransferedUsd += transfer.valueUsd;
				volume.totalApprovedUsd += transfer.valueUsd;
				const newVolume: IVolume = await volume.save();

			} else {
				throw new Error("failed to fetch token price");
			}

		}

		const newTranfer: ITransfer = await transfer.save()

		res
			.status(201)
			.json({ message: "transfer added", transfer: newTranfer })
	} catch (error) {
		throw error
	}
}


const getVolume = async (req: Request, res: Response): Promise<void> => {
	try {
		const totalVolume: IVolume | null = await Volume.findOne()
		res
			.status(201)
			.json(totalVolume)
	} catch (error) {
		throw error
	}
}


export { addTransfer, getVolume }
