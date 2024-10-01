import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, notification } from 'antd';
import * as web3 from '@solana/web3.js';
import { Buffer } from 'buffer';

// Ensure Buffer is defined for the browser
window.Buffer = Buffer;

const PhantomCheckoutModal = ({ isModalVisible, setIsModalVisible, amount, onPaymentSuccess }) => {
    const [isPaying, setIsPaying] = useState(false);
    const [phantomProvider, setPhantomProvider] = useState(null);

    useEffect(() => {
        const detectPhantomProvider = () => {
            if ('solana' in window) {
                const provider = window.solana;
                if (provider.isPhantom) {
                    setPhantomProvider(provider);
                } else {
                    notification.error({
                        message: "Wallet Not Supported",
                        description: "Please install Phantom Wallet."
                    });
                }
            } else {
                // notification.info({
                //     message: "Phantom Wallet Not Found",
                //     description: "Please install Phantom Wallet to continue.",
                // });
                // window.open('https://phantom.app/', '_blank');
            }
        };

        detectPhantomProvider();
    }, []);

    // Function to request SOL airdrop from the devnet faucet
    const requestAirdrop = async (publicKey) => {
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
        const airdropSignature = await connection.requestAirdrop(publicKey, web3.LAMPORTS_PER_SOL); // Request 1 SOL
        await connection.confirmTransaction(airdropSignature);
        notification.success({
            message: "Airdrop Successful",
            description: "1 SOL has been added to your wallet."
        });
    };

    const handlePhantomPayment = async () => {
        if (!phantomProvider) {
            notification.error({
                message: "Phantom wallet not found!",
                description: "Please install Phantom Wallet and try again."
            });
            return;
        }

        setIsPaying(true);

        try {
            // Connect Phantom wallet
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
            await phantomProvider.connect();
            const { publicKey } = phantomProvider;

            // Check account balance
            const balance = await connection.getBalance(publicKey);
            console.log('Current balance:', balance / web3.LAMPORTS_PER_SOL, 'SOL');

            if (balance < web3.LAMPORTS_PER_SOL * amount) {
                throw new Error("Insufficient funds in your wallet.");
            }

            // Transaction details
            const transaction = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new web3.PublicKey('C6cDDxP9vrZqDaJr8nqpxsXE7kTgsB7cAt2y2VvneCkx'), // Replace with your Solana address
                    lamports: web3.LAMPORTS_PER_SOL * amount, // Phantom transaction amount in SOL
                })
            );

            // Send transaction using getLatestBlockhash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signedTransaction = await phantomProvider.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());

            // Confirm transaction
            await connection.confirmTransaction(signature);

            notification.success({
                message: "Payment Successful",
                description: `Transaction ID: ${signature}`
            });

            onPaymentSuccess();
        } catch (error) {
            notification.error({
                message: "Payment Failed",
                description: error.message || "Something went wrong during the payment process"
            });
        } finally {
            setIsPaying(false);
            setIsModalVisible(false);
        }
    };


    // const handlePhantomPayment = async () => {
    //     if (!phantomProvider) {
    //         notification.error({
    //             message: "Phantom wallet not found!",
    //             description: "Please install Phantom Wallet and try again."
    //         });
    //         return;
    //     }
    //
    //     setIsPaying(true);
    //
    //     try {
    //         const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
    //         await phantomProvider.connect();
    //         const { publicKey } = phantomProvider;
    //
    //         // Check account balance
    //         const balance = await connection.getBalance(publicKey);
    //         console.log('Current balance:', balance / web3.LAMPORTS_PER_SOL, 'SOL');
    //
    //         // If the balance is less than the required amount, request an airdrop
    //         if (balance < web3.LAMPORTS_PER_SOL * amount) {
    //             notification.info({
    //                 message: "Insufficient Funds",
    //                 description: "Requesting SOL from the devnet faucet..."
    //             });
    //             await requestAirdrop(publicKey); // Request airdrop
    //         }
    //
    //         // Recheck balance after airdrop
    //         const newBalance = await connection.getBalance(publicKey);
    //         console.log('New balance after airdrop:', newBalance / web3.LAMPORTS_PER_SOL, 'SOL');
    //
    //         if (newBalance < web3.LAMPORTS_PER_SOL * amount) {
    //             throw new Error("Insufficient funds in your wallet. Please try again later.");
    //         }
    //
    //         // Create the transaction
    //         const transaction = new web3.Transaction().add(
    //             web3.SystemProgram.transfer({
    //                 fromPubkey: publicKey,
    //                 toPubkey: new web3.PublicKey('C6cDDxP9vrZqDaJr8nqpxsXE7kTgsB7cAt2y2VvneCkx'), // Replace with your devnet Solana address
    //                 lamports: web3.LAMPORTS_PER_SOL * amount,
    //             })
    //         );
    //
    //         const { blockhash } = await connection.getLatestBlockhash();
    //         transaction.recentBlockhash = blockhash;
    //         transaction.feePayer = publicKey;
    //
    //         const signedTransaction = await phantomProvider.signTransaction(transaction);
    //         const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    //
    //         await connection.confirmTransaction(signature);
    //
    //         notification.success({
    //             message: "Payment Successful",
    //             description: `Transaction ID: ${signature}`
    //         });
    //
    //         onPaymentSuccess();
    //     } catch (error) {
    //         notification.error({
    //             message: "Payment Failed",
    //             description: error.message || "Something went wrong during the payment process"
    //         });
    //         console.error("Error details:", error); // Log the full error for debugging
    //     } finally {
    //         setIsPaying(false);
    //         setIsModalVisible(false);
    //     }
    // };

    return (
        <Modal
            title="Thanh toán qua ví Phantom"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
        >
            <p>Bạn đang thực hiện thanh toán {amount} SOL (devnet)</p>
            <Button
                type="primary"
                onClick={handlePhantomPayment}
                disabled={isPaying}
            >
                {isPaying ? <Spin /> : 'Xác nhận thanh toán'}
            </Button>
        </Modal>
    );
};

export default PhantomCheckoutModal;
