const Blog = require('../models/Blog');
const { sequelize } = require('../database');

// Blog data - content provided by user
const blogData = [
  {
    title: "Do You Need an EPC for Your Warehouse? A Simple UK Guide",
    slug: "do-you-need-an-epc-for-your-warehouse",
    metaTitle: "Warehouse EPC Guide | Prime EPC Manchester",
    metaDescription: "Everything UK warehouse owners need to know about EPC certificates, compliance, and MEES regulations.",
    keywords: ["warehouse EPC", "commercial EPC", "energy performance certificate", "MEES compliance", "UK EPC guide"],
    content: `Do You Need an EPC for Your Warehouse? A Simple UK Guide
If you own or manage a warehouse in the UK and you’re planning to sell or rent it out, you’ve probably heard you need an Energy Performance Certificate (EPC).

But do you actually need one? And if so, what does it involve?
The short answer is: Usually yes, but there are important exceptions. This guide breaks down exactly when you need one, how to get it, and how to make sure you aren’t breaking any laws.

What is a Warehouse EPC?
Think of an EPC as a fuel-efficiency rating for your building. It grades your property from A (most efficient) to G (least efficient).
For a warehouse, you need a Non-Domestic EPC. This is different from the one you get for a house. It requires a qualified commercial assessor to visit the site and look at your insulation, lighting, and heating systems.

Does Your Warehouse Actually Need One?
This is the most common question we get. Not every warehouse needs a certificate. You might be exempt if your building meets specific criteria.

You generally DO NOT need an EPC if:
● The building is a standalone industrial site or workshop with 00000000000low energy demand.
● It is a non-residential agricultural building.
● The "Cold Warehouse" Rule: The warehouse has no heating or air conditioning and is used only for storage (and doesn't have a staffed office inside).

However: If you have a warehouse with a heated office block inside, or if the warehouse itself is heated/cooled, you almost certainly need an EPC to sell or lease it.

Does the Rating Affect Value?
Honest answer? Not really. Unlike an office block where high energy bills can scare off tenants, warehouse value is usually driven by square footage and location. However, a better rating is never a bad thing, and it proves the building has been well-maintained.

How to Get Your Certificate (Step-by-Step)
1. Hire an Accredited Assessor You need a "Level 3" or "Level 4" Non-Domestic Energy Assessor. Make sure they are accredited so the certificate is legally valid.
2. Get Your Paperwork Ready The assessment is faster if you have floor plans and details on your insulation or heating systems ready before they arrive.
3. The Site Visit The assessor will walk through the property to check the "building fabric" (walls, roof, floor), the lights, and the HVAC systems. It’s a visual inspection, so they won’t be drilling into walls. It shouldn't disrupt your daily operations.
4. The Result The assessor runs the data through government-approved software to generate your rating and lodgement on the national register. You’ll get a report showing your grade and a list of recommended improvements.

Stuck with a Low Rating?
If your warehouse comes out with a poor rating (F or G), don't panic. For warehouses, the fix is often simpler than you think.
● Lighting: Swapping old sodium or fluorescent lights for LEDs is often the single most cost-effective way to jump up a grade.
● Controls: Adding timers or motion sensors to lighting and heating can make a big difference.

The Legal Trap: MEES Compliance
This is the part you can't ignore. The Minimum Energy Efficiency Standards (MEES) state that you generally cannot grant a new lease on a commercial property if it has an EPC rating of F or G.
If you are planning to lease the building, check your rating first. If it's an F or G, you will likely need to make those LED upgrades before you can sign a tenant.
`,
    excerpt: "A complete UK guide for warehouse owners on EPC requirements, assessment, and compliance.",
    featuredImage: `http://localhost:3000/images/blog1.png`, // placeholder for your public folder image
    status: "published",
    author: "Prime EPC"
  },
  {
    title: "How Long Does an EPC Last?",
    slug: "how-long-does-an-epc-last",
    metaTitle: "EPC Validity & Renewal Guide | Prime EPC",
    metaDescription: "Learn how long EPC certificates last in the UK, when you need a new one, and assessment times for commercial and domestic properties.",
    keywords: ["EPC validity", "EPC duration", "UK property EPC", "energy certificate", "EPC assessment"],
    content: `How Long Does an EPC Last? 
If you are selling or renting out a property in the UK, the Energy Performance Certificate (EPC) is one of the first documents you will be asked for. 

But how long do they actually last? Do you need a new one every time you find a new tenant? 
Here is the no-nonsense guide to EPC validity, assessment times, and why you can’t ignore the "E" rating rule. 

The Short Answer: How Long is it Valid? 
An EPC is valid for 10 years. 

Once you have a certificate, you can reuse it as many times as you like within that decade for new sales or new tenancies. You do not need a new EPC for every new tenant, provided the old certificate hasn't expired. 
However, you should consider getting a new one early if: 
● You have made major renovations (like a new boiler, double glazing, or loft insulation). 
● Your current rating is poor (F or G). 
● You want to justify a higher asking price or rent by proving the bills will be lower. 

Who is Responsible for It? 
If you are the landlord or the seller, this is on you. You legally must order the EPC before you even market the property. If you are a tenant or a buyer, you don't need to arrange anything—you just need to be shown the certificate. 
What Actually Happens During the Assessment? 
People often worry this will be a big disruption. It isn’t. 
● Domestic (Homes): Takes about 30 to 40 minutes. 
● Commercial (Offices/Warehouses): Takes 45 minutes+ (depending on size). 

The assessor needs to access every room (including the loft). They will take measurements and photos of your heating, windows, and insulation. It is purely visual—they won't be lifting floorboards or drilling holes. 
The "Minimum E" Rule (Don't Get Caught Out) 
This is the most critical part for landlords. Under current UK law, you cannot legally rent out a property if the EPC rating is F or G. 
You must have a rating of E or higher. If your certificate is still valid (within 10 years) but shows an F or G rating, you cannot start a new tenancy until you make improvements to bring that score up. 

How Fast Can You Get One? 
We know that in property deals, time is money. You don't want to wait weeks. Typically, we can get an assessor to your door within 48 to 72 hours. Once the survey is done and payment is sorted, the certificate is lodged on the national register almost immediately. 

Need an EPC in Manchester? 
Don't leave your compliance to chance. At Prime EDC, we specialize in fast, accurate EPCs for both homes and commercial businesses. 

We cover a 40-mile radius around Manchester, offering: 
● Fast turnaround (usually within 2-3 days). 
● Fully accredited local assessors. 
● Competitive pricing with no hidden fees. 
`,
    excerpt: "No-nonsense guide on EPC validity, assessment times, and landlord responsibilities in the UK.",
    featuredImage: "http://localhost:3000/images/blog2.png",
    status: "published",
    author: "Prime EPC"
  },
  {
    title: "Lost Your EPC? How to Find It",
    slug: "lost-your-epc-how-to-find-it",
    metaTitle: "Retrieve Missing EPC Certificates | Prime EPC",
    metaDescription: "Step-by-step guide for UK property owners to find, download, or replace lost EPC certificates.",
    keywords: ["lost EPC", "retrieve EPC", "UK EPC register", "EPC replacement", "energy certificate"],
    content: `Lost Your EPC? How to Find It 
You are about to sell or rent your property, and your solicitor asks for the Energy Performance Certificate (EPC). You know you had one, but you can't find the paper copy anywhere. 
Don't panic. You probably don't need to pay for a new one. 

Here is how to check if your certificate is still valid, how to download a copy for free, and what to do if you need a new assessment. 
Step 1: Check the National Register (It’s Free) 
Before you spend a penny, check the government database. All valid EPCs in the UK are stored digitally on the GOV.UK EPC Register. 
● Go to the register website. 
● Type in your postcode. 
● If your address pops up, you can download the certificate as a PDF immediately for free. 

Note: An EPC is valid for 10 years. If your certificate on the register is older than that, it has expired, and you will need to book a new assessment. 
Step 2: Contact Your Old Assessor 
If you can't find it on the register but you are sure you had one done recently (perhaps for a new build that hasn't been lodged yet), try contacting the company that did the survey. They usually keep digital backups and can email you a duplicate. 
Step 3: When to Book a New Assessment 

Sometimes, finding the old certificate isn't the right move. You should book a fresh survey with Prime EPC & Design Consultants if: 
● It has expired: The old one is 10+ years old. 
● You’ve done work: If you’ve installed a new boiler, double glazing, or roof insulation since the last certificate, your old "D" rating might now be a "C." A better rating makes your property much easier to sell or rent. 
● The Rating is 'F' or 'G': You cannot legally rent out a property with these ratings. You need a new assessment to see exactly what upgrades are needed to hit the legal minimum of "E." 

What Actually Happens During a New Assessment? 
If you do need a new one, it’s a straightforward process. At Prime EPC & Design Consultants, our assessor will visit your property and check: 

● The Age & Size: How the building was constructed. 
● Insulation: They look at walls, roofs, and floors. 
● Heating: The efficiency of your boiler and radiators. 
● Windows: Whether you have single, double, or triple glazing. 

They don't need to tear anything apart; it is a non-intrusive visual inspection. 
Can You "Fail" an EPC? 
You can't "fail" it in the sense that you get no certificate. You will always get a rating between A (Best) and G (Worst). However, for landlords, an F or G rating is effectively a "fail" because it prevents you from signing a tenancy agreement. If you are worried about your rating, our team can advise you on the most cost-effective fixes (like LED bulbs or loft insulation) to get you over the line.

Need a New Certificate Fast? 
If your EPC is missing or expired, we can help sort it out quickly. Prime EDC provides accredited energy assessments across the UK. We focus on: 
● Speed: We know property deals can’t wait. 
● Accuracy: We ensure your rating reflects every improvement you've made. 
● Simple Pricing: No hidden fees. 
`,
    excerpt: "Step-by-step instructions to locate, download, or replace lost EPC certificates in the UK.",
    featuredImage: "http://localhost:3000/images/blog3.png",
    status: "published",
    author: "Prime EPC"
  },
  {
    title: "How to Hit EPC Rating 'C'",
    slug: "how-to-hit-epc-rating-c",
    metaTitle: "Achieve EPC Rating C | Prime EPC Guide",
    metaDescription: "Practical roadmap for UK property owners to improve their EPC rating to C with cost-effective measures.",
    keywords: ["EPC rating C", "energy efficiency", "property improvements", "UK EPC guide", "energy-saving tips"],
    content: `How to Hit EPC Rating 'C' 
Getting your property to a 'C' rating is one of the smartest moves you can make right now. 

For landlords, it is the safe zone for future regulations. For sellers, it makes your home stand out to buyers terrified of high energy bills. 
But do you need to spend a fortune on solar panels to get there? usually, no. 

Here is the practical roadmap to getting that 'C' grade, starting with the cheapest fixes first. 
Step 1: The "Low-Hanging Fruit" (Do These First) 
Before you start ripping out boilers, tackle the cheap and easy wins. These often nudge your score up just enough to cross the line. 
● 100% LED Lighting: This is the easiest point-scorer. If you still have old halogen or filament bulbs, swap every single one for an LED. It’s cheap, instant, and assessors look for it immediately. 
● Draught Proofing: Go around your windows, doors, and even the letterbox. If you can feel a breeze, you are losing points. inexpensive foam strips or brushes can seal these gaps. 
● Hot Water Cylinder Jacket: If you have a hot water tank, make sure it has a thick insulating jacket (at least 80mm). It costs about £20 and makes a surprising difference to your score. 

Step 2: Insulation (The Best Value for Money) 
You cannot heat a home effectively if the heat escapes through the roof. 
● Loft Insulation: If you have less than 270mm of wool in your loft, top it up. This is often the single most cost-effective way to jump up a letter grade. 
● Cavity Wall Insulation: If your house was built after the 1920s but before the 90s, you might have empty cavities in the walls. Filling them is relatively cheap and boosts heat retention massively. 

Step 3: Heating Controls (The "Smart" Fix) 
Sometimes your boiler is fine, but your controls are letting you down. An assessor wants to see that you can control where and when the heat is used. 
● Install a room thermostat if you don’t have one. 
● Add Thermostatic Radiator Valves (TRVs) to your radiators so you can control the temperature in each room individually. 

Step 4: The Heavy Lifters (Big Investments) 
If you have done all the above and are still stuck on a 'D', you might need to look at the heating system itself. 
● Upgrade the Boiler: If your boiler is an old non-condensing model (usually 15+ years old), swapping it for a modern A-rated condensing boiler will have a huge impact on your EPC. 
● Windows: moving from single glazing to double glazing adds points, though it is expensive. If you already have double glazing, upgrading to newer units adds less value to the score than you might think. 

Do You Need Renewables? 
People often assume they need Solar PV panels or heat pumps to get a C.Truth: In most standard homes, good insulation and a modern gas boiler are enough to hit a C. Solar panels are fantastic for getting you to a B or an A, but you rarely need them just for a C. 

Don't Guess—Get a Plan 
The worst thing you can do is spend money on upgrades that don't move the needle. At Prime EDC, we don't just give you a certificate; we give you a roadmap. Our assessors can tell you exactly which changes will get your specific property to that 'C' rating for the lowest cost. 
`,
    excerpt: "Practical steps to raise your property EPC rating to 'C' using low-cost, effective improvements.",
    featuredImage: "http://localhost:3000/images/blog4.jpg",
    status: "published",
    author: "Prime EPC"
  },
  {
    title: "Commercial EPCs: The Rules You Can't Ignore",
    slug: "commercial-epcs-the-rules-you-cant-ignore",
    metaTitle: "Commercial EPC Compliance | Prime EPC Manchester",
    metaDescription: "A guide for UK commercial property owners on EPC rules, MEES compliance, and improving energy ratings.",
    keywords: ["commercial EPC", "MEES compliance", "energy performance certificate", "UK EPC guide", "commercial property EPC"],
    content: `Commercial EPCs: The Rules You Can't Ignore 

If you own, lease, or manage a commercial building in the UK, the rules have changed. It is no longer just about having a piece of paper in a drawer; it is about whether you can legally trade or rent your property at all. 
This guide cuts through the jargon of "MEES" and "Directives" to tell you exactly what you need to do to stay on the right side of the law. 

The Basics: What is a Commercial EPC? 
You probably know the drill: An Energy Performance Certificate (EPC) rates your building from A (Excellent) to G (Poor).

But unlike a house, a commercial assessment is much more complex. The assessor looks at: 
● Zoning: How different parts of the building are used (e.g., a heated office vs. an unheated warehouse floor). 
● HVAC: The efficiency of your air conditioning and heating. 
● Lighting: Whether you are using old fluorescent tubes or modern LEDs. 

The Big Rule: The "Minimum E" Standard (MEES) 
This is the one that catches people out. Under the Minimum Energy Efficiency Standards (MEES), it is currently unlawful to grant a new lease—or continue an existing one—if your commercial property has an EPC rating of F or G. 

The Consequence: If you are caught renting out an F or G rated property without a valid exemption, you can face fines ranging from £5,000 to £150,000, depending on the property's rateable value. 
When Do You Legally Need an EPC? 
You must have a valid certificate if: 
● You sell the property. 
● You rent it out to a new tenant. 
● You finish construction on a new commercial building. 
● You make changes: If you split a building into separate units or extend it, you likely need a new EPC. 

Does a Lease Renewal Count? This is a common question. If you are just renewing a lease with an existing tenant, the rules can be tricky. However, the safest advice is: If your 
old EPC has expired, get a new one. It protects you from compliance risks and ensures you aren't accidentally breaching MEES rules. 

How We Calculate Your Rating 
Commercial assessments aren't guesswork. We use government-approved software (SBEM) to calculate the CO2 emissions of your building. We measure the building "zones." For example, we don't expect a warehouse loading bay to be as warm as the reception desk. We input the data for each zone to generate a fair and accurate rating. 

How to Improve a Poor Rating 
Stuck with a 'D' or 'E' and worried about future regulations? Commercial buildings are actually easier to upgrade than homes. 
1. Lighting: Switching a large office or warehouse to LED is the single biggest win. 
2. Controls: Installing occupancy sensors (so lights go off when staff leave) scores easy points. 
3. HVAC Maintenance: Simply proving your AC units are modern and serviced can help your score. 

Protect Your Asset with Prime EDC 
Don't wait until a lease is due to check your compliance. At Prime EDC, we work with landlords across Manchester and the North West to secure their commercial properties. 
● Commercial Specialists: We understand the difference between a corner shop and a distribution centre. 
● Fast Turnaround: We know commercial deals move fast. 
● Compliance Advice: If you are an F or G, we will tell you exactly how to fix it. 
`,
    excerpt: "Everything UK commercial property owners need to know about EPC compliance and energy regulations.",
    featuredImage: "http://localhost:3000/images/blog5.png",
    status: "published",
    author: "Prime EPC"
  }
];

async function migrateBlogs() {
  try {
    console.log('🔄 Starting blog migration...');
    
    await Blog.findOne({ where: {} });
    console.log('✅ Database connection working');
    
    let successCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < blogData.length; i++) {
      const blog = blogData[i];
      try {
        console.log(`\n📝 Migrating blog ${i + 1}: "${blog.title}"`);

        // Prepare data with ALL required fields including metaTitle and metaDescription
        const safeBlog = {
  title: blog.title,
  slug: blog.slug,
  meta_title: blog.metaTitle,
  meta_description: blog.metaDescription,
  keywords: JSON.stringify(blog.keywords || []),
  content: blog.content,
  featured_image: blog.featuredImage || '',
  excerpt: blog.excerpt || '',
  status: blog.status || 'published',
  author: blog.author || 'Prime EPC',
};

await Blog.upsert(safeBlog, { returning: true });


        // Use upsert with the model
        const [createdBlog, createdFlag] = await Blog.upsert(safeBlog, { returning: true });
        console.log(`✅ ${createdFlag ? 'Created' : 'Updated'}: ${blog.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate blog "${blog.title}":`, error.message);
        failedCount++;
      }
    }
    
    console.log(`\n🎉 Migration Summary: ✅ Success: ${successCount} ❌ Failed: ${failedCount}`);
    
    const finalCount = await Blog.count();
    console.log(`📋 Total blogs in database: ${finalCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateBlogs();
