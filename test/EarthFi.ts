import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("EarthFi contract Test Driven Development", () => {
    const contractFx = async () => {
        const [owner] = await hre.ethers.getSigners();

        const EarthFi = await hre.ethers.getContractFactory("EarthFi");
        const earthfi = await EarthFi.deploy();

        return { earthfi, owner };
    };

    describe("Deployment", () => {
        it("Should check if the contract deployed", async function () {
            const { earthfi, owner } = await loadFixture(contractFx);

            expect(await earthfi.owner()).to.equal(owner);
        });

        it("Should be able to list asset and get all products", async function () {
            const { earthfi } = await loadFixture(contractFx);
            const title = "Write a code"
            const location = "Write and make sure Hello world can display on the screen"
            const weight = hre.ethers.parseUnits("20");
            const amount = hre.ethers.parseEther("100");
            await earthfi.listAsset(title, location, weight, amount);

            const products = await earthfi.getAllProducts();
            const [product] = products;

            expect(product.title).to.equal(title);
            expect(product.location).to.equal(location);
            expect(product.weight).to.equal(weight);
            expect(product.amount).to.equal(amount);

        });
    })
})