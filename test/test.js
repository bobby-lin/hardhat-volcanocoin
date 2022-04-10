const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Volcano Coin Test", function () {
    
    let VolcanoCoin, volcanoCoin, owner, addr1;

    beforeEach(async () => {
        VolcanoCoin = await ethers.getContractFactory("VolcanoCoin");
        volcanoCoin = await VolcanoCoin.deploy();
        [owner, addr1] = await ethers.getSigners();
    })

    describe("Deployment", () => {
        it("Should be set with the VolcanoCoin Contract information", async () => {
            expect(addr1.address).to.not.equal(await volcanoCoin.owner());
            expect(await volcanoCoin.owner()).to.equal(owner.address);
            expect(await volcanoCoin.name()).to.equal("VolcanoCoin");
            expect(await volcanoCoin.symbol()).to.equal("VOLC");
        })
    });

    it("Should return initial total supply as 10000", async () => {
        expect(await volcanoCoin.totalCoinSupply()).to.equal(10000);
    });

    it("Should return initial owner's balance as 10000", async () => {
        expect(await volcanoCoin.balances(owner.address)).to.equal(10000);
    });
    
    it("Should allow total supply to be increased in 1000 token steps", async () => {
        const totalSupplyBefore = await volcanoCoin.totalCoinSupply();
        await volcanoCoin.connect(owner).updateTotalSupply();
        const totalSupplyAfter = await volcanoCoin.totalCoinSupply();
        expect(totalSupplyAfter).to.be.equal(parseInt(totalSupplyBefore) + 1000);
    });

    it("Should only allow owner to increase the supply", async () => {
        // Failed case
        await expect(volcanoCoin.connect(addr1).updateTotalSupply()).to.be.revertedWith("Ownable: caller is not the owner");
        // Case should not be reverted
        await expect(volcanoCoin.connect(owner).updateTotalSupply()).to.be.not.reverted;
    });

    it("Should return balance of 500 for addr1 after transferValue", async() => {
        expect(await volcanoCoin.balances(addr1.address)).to.equal(0);
        await volcanoCoin.connect(owner).transferValue(addr1.address, 500);
        expect(await volcanoCoin.balances(addr1.address)).to.equal(500);
    });

    it("Should return one payment reference for owner", async() => {
        await volcanoCoin.connect(owner).transferValue(addr1.address, 500);
        expect(await volcanoCoin.balances(addr1.address)).to.equal(500);
        const payments = await volcanoCoin.getPayments(owner.address);
        expect(payments[0]['recipient']).to.be.equal(addr1.address);
        expect(payments[0]['amount']).to.be.equal(500);
    });

  });