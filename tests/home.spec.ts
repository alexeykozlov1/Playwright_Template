import { test, expect } from '@playwright/test'

test('Verify the url and the logo', async ({ page }) => {
    await page.goto('https://www.icc-cricket.com/')
    expect(page.url()).toContain('cricket')
    await expect(page.getByRole('link', { name: 'Header Logo' })).toBeVisible()
    await expect(page.getByAltText('Header Logo')).toBeVisible()

})

test('Search and Verify new url and the header', async ({ page }) => {
    await page.goto('https://www.icc-cricket.com/')

    // await page.getByRole('button', { name: 'Search' }).click();
    await page.getByLabel('Search', { exact: true }).click();
    const searchInput = page.getByPlaceholder('what are you looking for?')
    await searchInput.fill('USA')
    await searchInput.press('Enter')
    // await page.waitForURL('https://www.icc-cricket.com/search?q=USA');
    expect(page.url()).toContain('search?q=USA')

})

test('Verify menu tabs text and links', async ({ page }) => {
    await page.goto('https://www.icc-cricket.com/')

    const menuTabs = [ 'MATCHES\nSHOP\nRANKINGS\nNEWS\nTEAMS\nAWARDS\nTRAVEL\nVIDEOS' ]

    const locators = page.locator('.menu-list-wrapper').nth(1);
    const elementHandles = await locators.elementHandles();

    const texts: string[] = await Promise.all(
        elementHandles.map(async (elementHandle) => {
          const textContent = await elementHandle.innerText();
          return textContent?.trim() ?? '';
        })
      );

       expect(texts).toEqual(menuTabs)

})