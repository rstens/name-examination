/**
 * Represents the home page of the BC Registry Name Examination application.
 */

import Utilities from '../appActions/Utilities'
const util = new Utilities()

/**
 * Represents the home page of the BC Registry Name Examination application.
 */
class HomePage {
  path = '/'
  title = 'BC Registry: Name Examination - Home'

  // Top Level Links
  adminLinkID = 'a[data-testid="adminLink"]'
  examineLinkID = 'a[data-testid="examineLink"]'
  searchLinkID = 'a[data-testid="searchLink"]'
  statsLinkID = 'a[data-testid="statsLink"]'

  // Link bar
  searchInputField = 'form[data-testid="searchNRNumberField"] input'
  searchButton = 'form[data-testid="searchNRNumberField"] button'
  prioritySwitch = 'div[data-testid="prioritySwitch"] button[role="switch"]'
  logOut = 'a[data-testid="logOut"]'

  // Search
  searchTable = '[data-testid="searchTable"]'
  headerRowStatus = 'th[id="Status"] button'
  headerRowNRNumber = 'input[type="text"][id="NR Number"]'
  headerRowApplicantFirstName = 'input[type="text"][id="Applicant First Name"]'
  headerRowApplicantLastName = 'input[type="text"][id="Applicant Last Name"]'
  headerRowModifiedBy = 'input[type="text"][id="Modified By"]'
  headerRowNames = 'input[type="text"][id="Names"]'
  headerRowConsentRequired = 'th[id="Consent Required"] button'
  headerRowPriority = 'th[id="Priority"] button'
  headerRowNotified = 'th[id="Notified"] button'
  headerRowSubmitted = 'th[id="Notified"] button'
  headerRowLastUpdate = 'th[id="Last Update"] button'
  headerRowSubmittedOrder = 'a[id="SubmittedOrder"]'

  // Stats
  statsTable = '[data-testid="statsTable"]'

  // Elements
  header = '#app-header'
  nrNumberHeader = 'div[data-testid="nrNumberHeader"]'

  // Status info
  displayDate = 'span#date'
  notExamined = 'span#notExamined'
  hold = 'span#hold'

  // Actions
  /**
   * Logs out the user by clicking the "Log Out" link.
   */

  /**
   * Navigates to the admin page by clicking the "Admin" link.
   */
  adminLink() {
    // Remove the target to stay in the same window for Cypress' sake
    cy.get(this.adminLinkID).invoke('removeAttr', 'target').click()
    cy.wait(1000)
    cy.url().should('include', 'namex-solr-dev.apps.silver.devops.gov.bc.ca')
    cy.contains('a', 'Login to administration.').click()
    cy.wait(1000)
    cy.url().then(($url) => {
      expect($url).to.contain('/admin/synonym')
    })
    cy.visit('/')
  }

  /**
   * Navigates to the examine names page by clicking the "Examine Names" link.
   */
  examineNamesLink() {
    cy.get(this.examineLinkID).click()
    cy.wait(1000)
    cy.url().then(($url) => {
      expect($url).to.contain('/examine')
    })
  }

  /**
   * Navigates to the search page by clicking the "Search" link.
   */
  searchLink() {
    cy.get(this.searchLinkID).click()
    cy.wait(1000)
    cy.url().then(($url) => {
      expect($url).to.contain('/search')
    })
  }

  /**
   * Navigates to the stats page by clicking the "Stats" link.
   */
  statsLink() {
    cy.get(this.statsLinkID).click()
    cy.wait(1000)
    cy.url().then(($url) => {
      expect($url).to.contain('/stats')
    })
  }

  /**
   * Toggles the priority switch by clicking on it.
   */
  prioritySwitchClick() {
    if (cy.get(this.prioritySwitch).invoke('attr', 'aria-checked')) {
      cy.get(this.prioritySwitch).click()
      cy.get(this.prioritySwitch)
        .invoke('attr', 'aria-checked')
        .should('eq', 'false')
    } else if (!cy.get(this.prioritySwitch).invoke('attr', 'aria-checked')) {
      cy.get(this.prioritySwitch).click()
      cy.get(this.prioritySwitch)
        .invoke('attr', 'aria-checked')
        .should('eq', 'true')
    }
  }

  /**
   * Retrieves the status information from the home page.
   *
   * @return {void}
   */
  statusInfo() {
    cy.get(this.displayDate).should('exist')
    cy.get(this.notExamined).should('exist')
    cy.get(this.hold).should('exist')
    cy.get(this.displayDate)
      .invoke('text')
      .then(($text) => {
        const date = util.getDate()
        const formattedDate = `${date.substring(0, 4)}-${date.substring(
          4,
          6
        )}-${date.substring(6, 8)}`
        expect($text).to.contain(formattedDate)
        cy.log($text)
      })
  }
}
export default HomePage
