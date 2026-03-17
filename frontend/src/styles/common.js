// src/styles/common.js
// Theme: Amazon-inspired — dark header (#131921), accent (#ff9900), clean body (#f5f5f7)
// Inspired by amazon.com — professional e-commerce look

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#f5f5f7] min-h-screen"
// export const pageWrapper    = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
export const pageWrapper = "w-full px-2 sm:px-4 lg:px-6 py-6 sm:py-8"
export const section        = "mb-8 sm:mb-12 lg:mb-14"

// ─── Cards ────────────────────────────────────────────
export const cardClass      = "bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200"
// Enhanced card effect for product items
export const productCardClass   = "bg-white p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-2.5 cursor-pointer rounded-lg border border-gray-200"
// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131921] tracking-tight leading-none mb-2"
export const headingClass   = "text-xl sm:text-2xl font-bold text-[#131921] tracking-tight"
export const subHeadingClass= "text-base sm:text-lg font-semibold text-[#131921] tracking-tight"
export const bodyText       = "text-[#333] leading-relaxed text-sm sm:text-base"
export const mutedText      = "text-xs sm:text-sm text-[#666]"
export const linkClass      = "text-[#0066cc] hover:text-[#004499] transition-colors text-sm sm:text-base"

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn     = "bg-[#ff9900] text-white font-semibold px-3 sm:px-4 py-2 rounded hover:bg-[#e68a00] transition-colors cursor-pointer text-xs sm:text-sm tracking-tight"
export const secondaryBtn   = "border border-gray-300 text-[#131921] font-medium px-3 sm:px-4 py-2 rounded hover:bg-gray-100 transition-colors cursor-pointer text-xs sm:text-sm"
export const ghostBtn       = "text-[#131921] font-medium hover:text-[#ff9900] transition-colors cursor-pointer text-xs sm:text-sm"

// ─── Forms ────────────────────────────────────────────
export const formCard       = "bg-white rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto border border-gray-200 shadow-xl"
export const formBackground = "bg-gradient-to-br from-[#f5f5f7] to-[#ebebf0] bg-cover bg-center min-h-screen flex items-center justify-center relative px-4"
export const formTitle      = "text-xl sm:text-2xl font-bold text-[#131921] tracking-tight text-center mb-4 sm:mb-7"
export const labelClass     = "text-xs font-medium text-[#666] mb-1.5 block"
export const inputClass     = "w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-[#131921] text-sm placeholder:text-[#999] focus:outline-none focus:border-[#ff9900] focus:ring-2 focus:ring-[#ff9900]/20 transition"
export const formGroup      = "mb-3 sm:mb-4"
export const submitBtn      = "w-full bg-[#ff9900] text-white font-semibold py-2.5 rounded-lg hover:bg-[#e68a00] transition-colors cursor-pointer mt-2 text-sm tracking-tight"

// ─── Navbar / Header ─────────────────────────────────
export const navbarClass        = "bg-[#131921] text-white border-b border-[#2f3a48] px-4 sm:px-6 py-3 flex items-center sticky top-0 z-50 shadow-sm";
export const navContainerClass  = "max-w-6xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4";
export const navBrandClass      = "text-lg sm:text-2xl font-bold tracking-tight text-[#ff9900]";
export const navLinksClass      = "hidden md:flex items-center gap-5";
export const navLinkClass       = "text-xs sm:text-sm text-white/80 hover:text-white transition font-medium";
export const navLinkActiveClass = "text-xs sm:text-sm text-white font-semibold";
export const navSignOutBtn      = "text-xs sm:text-sm text-white/80 font-medium cursor-pointer";
export const navSearchClass     = "flex-1 max-w-xs sm:max-w-xl";
export const navSearchInput      = "w-full rounded border border-[#344055] bg-[#0f1724] px-3 sm:px-4 py-2 text-xs sm:text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#ff9900]/60";
export const iconButton         = "inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 transition";
export const badgeClass         = "inline-flex items-center justify-center rounded-full bg-[#ff9900] text-xs font-semibold text-[#0f1724] w-4 h-4 sm:w-5 sm:h-5";


// ─── Article / Blog ───────────────────────────────────
export const productGrid        = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
export const productTitle       = "text-sm sm:text-base font-semibold text-[#131921] leading-snug tracking-tight"
export const productExcerpt     = "text-xs sm:text-sm text-[#666] leading-relaxed"
export const productMeta        = "text-xs text-[#999]"
export const productBody        = "text-[#333] leading-[1.85] text-sm sm:text-[0.95rem] max-w-2xl"
export const timestampClass     = "text-xs text-[#999] flex items-center gap-1.5"
export const tagClass           = "text-[0.65rem] font-semibold text-[#ff9900] uppercase tracking-widest w-fit"

// ─── Offers / Carousel ─────────────────────────────────
export const dealCardClass      = "bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer min-w-[220px]"
export const dealBadgeClass     = "inline-flex items-center gap-2 rounded-full bg-[#ff9900]/10 px-3 py-1 text-xs font-semibold text-[#ff9900]"

// ─── Filters ─────────────────────────────────────────
// export const filterSidebar =
// "w-full lg:w-[28rem] xl:w-[32rem] bg-[#fafafa] rounded-lg border-2 border-[#f0f0f0] p-4 sm:p-6 space-y-6 sm:space-y-8 sticky top-20 sm:top-24 shadow-md h-fit z-40 mb-6 lg:mb-0"
export const filterTitle        = "text-sm sm:text-base font-bold text-[#131921] mb-4 flex items-center gap-2"
export const filterLabel        = "text-xs sm:text-sm text-[#666] mb-2 block"
export const filterInput        = "w-full rounded-lg border-2 border-[#e0e0e0] bg-white px-4 py-3 text-sm sm:text-base focus:border-[#ff9900] focus:outline-none focus:ring-2 focus:ring-[#ff9900]/30 transition shadow-sm"
export const filterButton       = "w-full bg-[#ff9900] text-white font-bold py-3 rounded-lg hover:bg-[#e68a00] transition text-sm sm:text-base cursor-pointer shadow-sm hover:shadow-md"

// ─── Feedback ─────────────────────────────────────────
export const errorClass         = "bg-red-50 text-red-700 border border-red-200 rounded px-4 py-3 text-sm"
export const successClass       = "bg-green-50 text-green-700 border border-green-200 rounded px-4 py-3 text-sm"
export const loadingClass       = "text-[#ff9900]/60 text-sm animate-pulse text-center py-10"
export const emptyStateClass    = "text-center text-[#666] py-16 text-sm"

// Footer
export const footerWrapper      = "bg-[#131921] text-white"
export const footerContainer    = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
export const footerHeading      = "text-xs sm:text-sm font-semibold text-white tracking-tight mb-2 sm:mb-3"
export const footerLink         = "text-xs sm:text-sm text-gray-300 hover:text-[#ff9900] transition-colors"
export const footerSocialLink   = "inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#ff9900] transition-colors"
export const footerBadge        = "inline-flex items-center gap-2 rounded-full bg-gray-700 px-2 sm:px-3 py-1 text-xs font-semibold text-gray-300"
export const footerButton       = "inline-flex items-center justify-center gap-2 rounded border border-gray-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:border-[#ff9900] hover:text-[#ff9900] transition"
// ─── Divider ──────────────────────────────────────────
export const divider            = "border-t border-[#e8e8ed] my-10"

//product 
export const productImage="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto"
export const productName="text-base sm:text-lg font-bold"
// cart
// Cart
export const cartWrapper = "max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12"
export const cartCard = "bg-white rounded-lg p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3 mb-4 sm:mb-6 hover:shadow-lg transition-shadow border border-gray-200"
export const priceText = "text-xs sm:text-sm text-[#666]"
export const quantityText = "text-xs sm:text-sm text-[#666]"
export const totalPriceClass = "text-lg sm:text-xl font-semibold text-[#131921] mt-4 sm:mt-6"
export const removeBtn = "text-red-600 text-xs sm:text-sm font-medium hover:underline cursor-pointer"

// admin
// ─── Admin / Dashboard ─────────────────────────

export const searchInput = "bg-white border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#ff9900] transition"

export const selectInput = "bg-white border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#ff9900] transition"

export const adminPageWrapper = "max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12"

export const adminHeader = "text-2xl sm:text-3xl font-bold text-[#131921] tracking-tight mb-4 sm:mb-6 lg:mb-8 pb-2 sm:pb-4 border-b-2 border-gray-200"

// Admin card styles
export const adminCardClass     = "bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
export const adminCardGrid      = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
export const adminFormCard      = "bg-white rounded-lg p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto border border-gray-200 shadow-lg"
export const adminTableClass    = "w-full border-collapse rounded-lg overflow-hidden shadow-sm"
export const adminTableHeader   = "bg-[#131921] text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
export const adminTableRow      = "border-b border-gray-200 hover:bg-[#f5f5f7] transition-colors"
export const adminTableCell     = "py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-[#333]"

export const dangerBtn = "text-red-600 text-xs sm:text-sm font-semibold hover:text-red-700 transition-colors cursor-pointer"


//
// ─── Sidebar ─────────────────────────────────────

export const layoutWrapper = "flex flex-col lg:flex-row min-h-screen bg-[#f5f5f7] gap-4 sm:gap-6 lg:gap-8"

export const sidebarClass =
  "w-full lg:w-64 bg-[#f5f5f7] border-r border-[#e8e8ed] p-4 sm:p-6 flex flex-col gap-4 sm:gap-6"

export const sidebarTitle =
  "text-lg sm:text-xl font-bold text-[#1d1d1f]"

export const sidebarLink =
  "text-xs sm:text-sm text-[#6e6e73] hover:text-[#0066cc] cursor-pointer transition"

export const sidebarActive =
  "text-xs sm:text-sm text-[#0066cc] font-semibold"

export const contentArea =
  "flex-1 p-4 sm:p-6 lg:p-10"


  export const filterSidebar =
"w-full lg:w-72 xl:w-80 bg-[#fafafa] rounded-lg border-2 border-[#f0f0f0] p-4 sm:p-6 space-y-6 sm:space-y-8 sticky top-20 sm:top-24 shadow-md h-fit z-40 mb-6 lg:mb-0"


//

// ─── Navbar / Header Adjustments ─────────────────────────────────

// Make the mobile menu appear below the profile icon
export const mobileMenuWrapper = `
  absolute top-full right-0 mt-2 bg-gray-900 text-white px-4 py-3 space-y-3 rounded-lg shadow-lg z-50
  w-48
`;

// Adjust mobile buttons alignment
export const mobileProfileButton = `
  relative z-50 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition
`;

// Ensure hamburger is stacked under profile on mobile
export const mobileHamburgerButton = `
  relative z-50 inline-flex items-center justify-center w-10 h-10 mt-2 rounded-full hover:bg-white/10 transition
`;

// Mobile Nav Links
export const mobileNavLink = `
  block w-full text-left text-white/80 hover:text-white font-medium py-1
`;

// Mobile Sign Out button with highlight
export const mobileSignOutBtn = `
  block w-full text-left text-red-400 font-medium hover:text-red-200 py-1
`;