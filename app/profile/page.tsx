"use client";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
// import { updateUserInDB } from "@/lib/api"; // Define your API function for database updates

const ProfilePage = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || ""); // Pre-fill with Clerk user data
  const [dbData, setDbData] = useState({ customField: "" }); // Example database data field

  const handleUpdate = async () => {
    // TODO: Implement your own API function to update the database
    // try {
    //   await updateUserInDB({ name, customField: dbData.customField });
    //   setIsEditing(false);
    // } catch (error) {
    //   console.error("Update failed", error);
    // }
  };

  return (
    <main id="content" className="pv4jt uvc76 rr0zs c6jjk ">
      {/* <!-- Breadcrumb --> */}
      <ol className="nx3qm gi86s ejsny nxogj uxyy7 cr73y p2vco flex items-center w9zxc">
        <li className="flex items-center pdak6 tqixq dark:text-neutral-500">
          Account
          <svg
            className="h21yx w199m ufena csib9 pal0s dark:text-neutral-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 13L10 3"
              stroke="currentColor"
              stroke-linecap="round"
            ></path>
          </svg>
        </li>
        <li className="gf9di flex items-center rozsb p9tun dark:text-neutral-200 pdak6">
          Profile
        </li>
      </ol>
      {/* <!-- End Breadcrumb --> */}

      <div className="g0aw2 d0cw8 g6j9v ejsny cwicw">
        {/* <!-- Account Nav --> */}
        <div className="qaxp8 flex vtk9m w9zxc o84ex sb37l d432g onu28 oasqe c7c11 iz02v dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 m9vu4 dhiec q8jf0 ycht7 dark:bg-neutral-800 dark:!border-neutral-700 dark:focus:text-neutral-200 "
            href="../../pro/dashboard/account-profile.html"
          >
            Profile
          </a>
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400  "
            href="../../pro/dashboard/account-notifications.html"
          >
            Notifications
          </a>
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400  "
            href="../../pro/dashboard/account-integrations.html"
          >
            Integrations
          </a>
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400  "
            href="../../pro/dashboard/account-preferences.html"
          >
            Preferences
          </a>
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400  "
            href="../../pro/dashboard/account-workspace.html"
          >
            Workspace
          </a>
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400  "
            href="../../pro/dashboard/account-plan-and-billing.html"
          >
            Plan &amp; Billing
          </a>
          <a
            className="bdby8 viac4 s2k2k items-center dsp0o pdak6 w9zxc efs5t xk8dv p9tun nz0zf awdil xwjcj c3i4e r0fp5 rnsuy dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400  "
            href="../../pro/dashboard/account-members.html"
          >
            Members
          </a>
        </div>
        {/* <!-- End Account Nav --> */}

        {/* <!-- Account Card --> */}
        <div className="lc5w1 e7t1l m9vu4 efs5t kq7zk ycht7 dxf1r dark:bg-neutral-800 dark:border-neutral-700">
          {/* <!-- Title --> */}
          <div className="btpd5 xkfts">
            <h1 className="a23oc rozsb p9tun dark:text-neutral-200">Profile</h1>
            <p className="pdak6 z1v6e dark:text-neutral-500">
              Manage your name, password and account settings.
            </p>
          </div>
          {/* <!-- End Title --> */}

          {/* <!-- Form --> */}
          <form>
            {/* <!-- Avatar --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Avatar
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  {/* <!-- Logo Upload Group --> */}
                  <div className="flex flex-wrap items-center jrfak aeyqw">
                    <span className="flex h21yx dry15 items-center tf07z tezpy su3c3 wv197 pal0s lli30 dark:border-neutral-700 dark:text-neutral-600">
                      <svg
                        className="h21yx zxfop"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </span>

                    <div className="ce341">
                      <div className="flex items-center dsp0o">
                        <button
                          type="button"
                          className="bdby8 viac4 s2k2k items-center dsp0o bqo3s f4yq1 awdil efs5t xk8dv uylzq hrliy wa7ya xwjcj c3i4e r0fp5 dg2gp xp6ug"
                        >
                          <svg
                            className="h21yx ufena"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" x2="12" y1="3" y2="15" />
                          </svg>
                          Upload photo
                        </button>
                        <button
                          type="button"
                          className="bdby8 viac4 s2k2k items-center dsp0o bqo3s f4yq1 awdil efs5t kq7zk m9vu4 yxkwm ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          disabled
                        >
                          Delete
                        </button>
                      </div>
                      <p className="jglyo bqo3s z1v6e dark:text-neutral-500">
                        Pick a photo up to 1MB.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Logo Upload Group --> */}
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Avatar --> */}

            {/* <!-- Cover Photo --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Cover photo
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  {/* <!-- Drag 'n Drop --> */}
                  <div className="jglyo lqwjx flex dry15 m9vu4 efs5t sx2o3 wv197 dxf1r dark:bg-neutral-800 dark:border-neutral-600">
                    <div className="a3cw8">
                      <svg
                        className="oc530 pal0s huxlp dark:text-neutral-400"
                        width="70"
                        height="46"
                        viewBox="0 0 70 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="2"
                          className="g4ri5 jq5nh dark:fill-neutral-800 dark:stroke-neutral-500"
                        />
                        <path
                          d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="2"
                          className="g4ri5 jq5nh dark:fill-neutral-800 dark:stroke-neutral-500"
                        />
                        <rect
                          x="17.0656"
                          y="1.62305"
                          width="35.8689"
                          height="42.7541"
                          rx="5"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="2"
                          className="g4ri5 jq5nh dark:fill-neutral-800 dark:stroke-neutral-500"
                        />
                        <path
                          d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z"
                          stroke="currentColor"
                          stroke-width="2"
                          className="jq5nh dark:stroke-neutral-500"
                        />
                        <circle
                          cx="39.5902"
                          cy="14.9672"
                          r="4.16393"
                          stroke="currentColor"
                          stroke-width="2"
                          className="jq5nh dark:stroke-neutral-500"
                        />
                      </svg>

                      <div className="c6lyt flex flex-wrap dry15 pdak6 cy6rq tqixq">
                        <span className="tdvxx f4yq1 p9tun dark:text-neutral-200">
                          Drop your file here or
                        </span>
                        <label className="relative cursor-pointer m9vu4 rozsb oqj39 vf475 awdil n68l9 lcels b3yyc j6qd9 ynttt dvs8v dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600">
                          <span>browse</span>
                          <input
                            id="hs-pro-dapcp"
                            type="file"
                            className="tliya"
                            name="hs-pro-dapcp"
                          />
                        </label>
                      </div>

                      <p className="jatgu bqo3s pal0s dark:text-neutral-400">
                        Pick a photo up to 2MB.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Drag 'n Drop --> */}
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Cover Photo --> */}

            {/* <!-- Personal Info --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              <h2 className="rozsb p9tun dark:text-neutral-200">
                Personal info
              </h2>

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Name
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <input
                    id="hs-pro-dappinm"
                    type="text"
                    className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                    placeholder="Enter full name"
                  />

                  <p className="jglyo pdak6 z1v6e dark:text-neutral-500">
                    Enter your full name, or a display name you are comfortable
                    with.
                  </p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Username
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <input
                    id="hs-pro-dappiun"
                    type="text"
                    className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                    placeholder="Enter username"
                  />

                  <p className="jglyo pdak6 z1v6e dark:text-neutral-500">
                    Enter your display name on Preline public forums.
                  </p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Email
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <input
                    id="hs-pro-dappiem"
                    type="text"
                    className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                    placeholder="Enter email address"
                  />

                  <p className="jglyo pdak6 z1v6e dark:text-neutral-500">
                    Enter the email address you want to use to log in with
                    Preline.
                  </p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Location
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  {/* <!-- Select --> */}
                  <div className="relative">
                    <select
                      data-hs-select='{
                      "placeholder": "Country",
                      "hasSearch": true,
                      "searchPlaceholder": "Country",
                      "searchClasses": "block qaxp8 pdak6 kq7zk awdil lj756 xp6ug dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 bdby8 viac4",
                      "searchWrapperClasses": "m9vu4 g0aw2 -mx-1 x6em4 fopbl dark:bg-neutral-900",
                      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span data-icon></span><span class=\"p9tun dark:text-neutral-200 \" data-title></span></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative bdby8 dio2m g87bf flex dsp0o ifji7 qaxp8 cursor-pointer m9vu4 efs5t kq7zk awdil vf6o6 pdak6 r0fp5 dg2gp xp6ug dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
                      "dropdownClasses": "ug6rp lavrb m0v3o z4ia7 le6w0 qaxp8 apqjg bgcuw m9vu4 dxf1r shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] zq2x8 oasqe c7c11 iz02v dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 bdby8 iwwvx qaxp8 pdak6 p9tun cursor-pointer um5nz awdil r0fp5 ip2jr dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "optionTemplate": "<div><div class=\"flex items-center \"><div class=\"uvg3z \" data-icon></div><div class=\"p9tun dark:text-neutral-200 \" data-title></div></div></div>",
                      "viewport": "#hs-pro-dapl"
                    }'
                      className="hidden"
                    >
                      <option value="">Choose</option>
                      <option
                        value="AF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/af.png\" alt=\"Afghanistan\" />"}'
                      >
                        Afghanistan
                      </option>
                      <option
                        value="AX"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ax.png\" alt=\"Aland Islands\" />"}'
                      >
                        Aland Islands
                      </option>
                      <option
                        value="AL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/al.png\" alt=\"Albania\" />"}'
                      >
                        Albania
                      </option>
                      <option
                        value="DZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/dz.png\" alt=\"Algeria\" />"}'
                      >
                        Algeria
                      </option>
                      <option
                        value="AS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/as.png\" alt=\"American Samoa\" />"}'
                      >
                        American Samoa
                      </option>
                      <option
                        value="AD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ad.png\" alt=\"Andorra\" />"}'
                      >
                        Andorra
                      </option>
                      <option
                        value="AO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ao.png\" alt=\"Angola\" />"}'
                      >
                        Angola
                      </option>
                      <option
                        value="AI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ai.png\" alt=\"Anguilla\" />"}'
                      >
                        Anguilla
                      </option>
                      <option
                        value="AG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ag.png\" alt=\"Antigua and Barbuda\" />"}'
                      >
                        Antigua and Barbuda
                      </option>
                      <option
                        value="AR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ar.png\" alt=\"Argentina\" />"}'
                      >
                        Argentina
                      </option>
                      <option
                        value="AM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/am.png\" alt=\"Armenia\" />"}'
                      >
                        Armenia
                      </option>
                      <option
                        value="AW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/aw.png\" alt=\"Aruba\" />"}'
                      >
                        Aruba
                      </option>
                      <option
                        value="AU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/au.png\" alt=\"Australia\" />"}'
                      >
                        Australia
                      </option>
                      <option
                        value="AT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/at.png\" alt=\"Austria\" />"}'
                      >
                        Austria
                      </option>
                      <option
                        value="AZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/az.png\" alt=\"Azerbaijan\" />"}'
                      >
                        Azerbaijan
                      </option>
                      <option
                        value="BS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bs.png\" alt=\"Bahamas\" />"}'
                      >
                        Bahamas
                      </option>
                      <option
                        value="BH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bh.png\" alt=\"Bahrain\" />"}'
                      >
                        Bahrain
                      </option>
                      <option
                        value="BD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bd.png\" alt=\"Bangladesh\" />"}'
                      >
                        Bangladesh
                      </option>
                      <option
                        value="BB"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bb.png\" alt=\"Barbados\" />"}'
                      >
                        Barbados
                      </option>
                      <option
                        value="BY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/by.png\" alt=\"Belarus\" />"}'
                      >
                        Belarus
                      </option>
                      <option
                        value="BE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/be.png\" alt=\"Belgium\" />"}'
                      >
                        Belgium
                      </option>
                      <option
                        value="BZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bz.png\" alt=\"Belize\" />"}'
                      >
                        Belize
                      </option>
                      <option
                        value="BJ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bj.png\" alt=\"Benin\" />"}'
                      >
                        Benin
                      </option>
                      <option
                        value="BM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bm.png\" alt=\"Bermuda\" />"}'
                      >
                        Bermuda
                      </option>
                      <option
                        value="BT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bt.png\" alt=\"Bhutan\" />"}'
                      >
                        Bhutan
                      </option>
                      <option
                        value="BO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bo.png\" alt=\"Bolivia (Plurinational State of)\" />"}'
                      >
                        Bolivia (Plurinational State of)
                      </option>
                      <option
                        value="BQ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bq.png\" alt=\"Bonaire, Sint Eustatius and Saba\" />"}'
                      >
                        Bonaire, Sint Eustatius and Saba
                      </option>
                      <option
                        value="BA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ba.png\" alt=\"Bosnia and Herzegovina\" />"}'
                      >
                        Bosnia and Herzegovina
                      </option>
                      <option
                        value="BW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bw.png\" alt=\"Botswana\" />"}'
                      >
                        Botswana
                      </option>
                      <option
                        value="BR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/br.png\" alt=\"Brazil\" />"}'
                      >
                        Brazil
                      </option>
                      <option
                        value="IO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/io.png\" alt=\"British Indian Ocean Territory\" />"}'
                      >
                        British Indian Ocean Territory
                      </option>
                      <option
                        value="BN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bn.png\" alt=\"Brunei Darussalam\" />"}'
                      >
                        Brunei Darussalam
                      </option>
                      <option
                        value="BG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bg.png\" alt=\"Bulgaria\" />"}'
                      >
                        Bulgaria
                      </option>
                      <option
                        value="BF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bf.png\" alt=\"Burkina Faso\" />"}'
                      >
                        Burkina Faso
                      </option>
                      <option
                        value="BI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bi.png\" alt=\"Burundi\" />"}'
                      >
                        Burundi
                      </option>
                      <option
                        value="CV"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cv.png\" alt=\"Cabo Verde\" />"}'
                      >
                        Cabo Verde
                      </option>
                      <option
                        value="KH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kh.png\" alt=\"Cambodia\" />"}'
                      >
                        Cambodia
                      </option>
                      <option
                        value="CM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cm.png\" alt=\"Cameroon\" />"}'
                      >
                        Cameroon
                      </option>
                      <option
                        value="CA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ca.png\" alt=\"Canada\" />"}'
                      >
                        Canada
                      </option>
                      <option
                        value="KY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ky.png\" alt=\"Cayman Islands\" />"}'
                      >
                        Cayman Islands
                      </option>
                      <option
                        value="CF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cf.png\" alt=\"Central African Republic\" />"}'
                      >
                        Central African Republic
                      </option>
                      <option
                        value="TD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/td.png\" alt=\"Chad\" />"}'
                      >
                        Chad
                      </option>
                      <option
                        value="CL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cl.png\" alt=\"Chile\" />"}'
                      >
                        Chile
                      </option>
                      <option
                        value="CN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cn.png\" alt=\"China\" />"}'
                      >
                        China
                      </option>
                      <option
                        value="CX"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cx.png\" alt=\"Christmas Island\" />"}'
                      >
                        Christmas Island
                      </option>
                      <option
                        value="CC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cc.png\" alt=\"Cocos (Keeling) Islands\" />"}'
                      >
                        Cocos (Keeling) Islands
                      </option>
                      <option
                        value="CO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/co.png\" alt=\"Colombia\" />"}'
                      >
                        Colombia
                      </option>
                      <option
                        value="KM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/km.png\" alt=\"Comoros\" />"}'
                      >
                        Comoros
                      </option>
                      <option
                        value="CK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ck.png\" alt=\"Cook Islands\" />"}'
                      >
                        Cook Islands
                      </option>
                      <option
                        value="CR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cr.png\" alt=\"Costa Rica\" />"}'
                      >
                        Costa Rica
                      </option>
                      <option
                        value="HR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/hr.png\" alt=\"Croatia\" />"}'
                      >
                        Croatia
                      </option>
                      <option
                        value="CU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cu.png\" alt=\"Cuba\" />"}'
                      >
                        Cuba
                      </option>
                      <option
                        value="CW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cw.png\" alt=\"Curaçao\" />"}'
                      >
                        Curaçao
                      </option>
                      <option
                        value="CY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cy.png\" alt=\"Cyprus\" />"}'
                      >
                        Cyprus
                      </option>
                      <option
                        value="CZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cz.png\" alt=\"Czech Republic\" />"}'
                      >
                        Czech Republic
                      </option>
                      <option
                        value="CI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ci.png\" alt=Côte dIvoire\" />"}'
                      >
                        Côte dIvoire
                      </option>
                      <option
                        value="CD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cd.png\" alt=\"Democratic Republic of the Congo\" />"}'
                      >
                        Democratic Republic of the Congo
                      </option>
                      <option
                        value="DK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/dk.png\" alt=\"Denmark\" />"}'
                      >
                        Denmark
                      </option>
                      <option
                        value="DJ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/dj.png\" alt=\"Djibouti\" />"}'
                      >
                        Djibouti
                      </option>
                      <option
                        value="DM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/dm.png\" alt=\"Dominica\" />"}'
                      >
                        Dominica
                      </option>
                      <option
                        value="DO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/do.png\" alt=\"Dominican Republic\" />"}'
                      >
                        Dominican Republic
                      </option>
                      <option
                        value="EC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ec.png\" alt=\"Ecuador\" />"}'
                      >
                        Ecuador
                      </option>
                      <option
                        value="EG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/eg.png\" alt=\"Egypt\" />"}'
                      >
                        Egypt
                      </option>
                      <option
                        value="SV"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sv.png\" alt=\"El Salvador\" />"}'
                      >
                        El Salvador
                      </option>
                      <option
                        value="GB-ENG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"England\" />"}'
                      >
                        England
                      </option>
                      <option
                        value="GQ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gq.png\" alt=\"Equatorial Guinea\" />"}'
                      >
                        Equatorial Guinea
                      </option>
                      <option
                        value="ER"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/er.png\" alt=\"Eritrea\" />"}'
                      >
                        Eritrea
                      </option>
                      <option
                        value="EE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ee.png\" alt=\"Estonia\" />"}'
                      >
                        Estonia
                      </option>
                      <option
                        value="ET"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/et.png\" alt=\"Ethiopia\" />"}'
                      >
                        Ethiopia
                      </option>
                      <option
                        value="FK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/fk.png\" alt=\"Falkland Islands\" />"}'
                      >
                        Falkland Islands
                      </option>
                      <option
                        value="FO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/fo.png\" alt=\"Faroe Islands\" />"}'
                      >
                        Faroe Islands
                      </option>
                      <option
                        value="FM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/fm.png\" alt=\"Federated States of Micronesia\" />"}'
                      >
                        Federated States of Micronesia
                      </option>
                      <option
                        value="FJ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/fj.png\" alt=\"Fiji\" />"}'
                      >
                        Fiji
                      </option>
                      <option
                        value="FI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/fi.png\" alt=\"Finland\" />"}'
                      >
                        Finland
                      </option>
                      <option
                        value="FR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/fr.png\" alt=\"France\" />"}'
                      >
                        France
                      </option>
                      <option
                        value="GF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gf.png\" alt=\"French Guiana\" />"}'
                      >
                        French Guiana
                      </option>
                      <option
                        value="PF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pf.png\" alt=\"French Polynesia\" />"}'
                      >
                        French Polynesia
                      </option>
                      <option
                        value="TF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tf.png\" alt=\"French Southern Territories\" />"}'
                      >
                        French Southern Territories
                      </option>
                      <option
                        value="GA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ga.png\" alt=\"Gabon\" />"}'
                      >
                        Gabon
                      </option>
                      <option
                        value="GM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gm.png\" alt=\"Gambia\" />"}'
                      >
                        Gambia
                      </option>
                      <option
                        value="GE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ge.png\" alt=\"Georgia\" />"}'
                      >
                        Georgia
                      </option>
                      <option
                        value="DE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/de.png\" alt=\"Germany\" />"}'
                      >
                        Germany
                      </option>
                      <option
                        value="GH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gh.png\" alt=\"Ghana\" />"}'
                      >
                        Ghana
                      </option>
                      <option
                        value="GI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gi.png\" alt=\"Gibraltar\" />"}'
                      >
                        Gibraltar
                      </option>
                      <option
                        value="GR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gr.png\" alt=\"Greece\" />"}'
                      >
                        Greece
                      </option>
                      <option
                        value="GL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gl.png\" alt=\"Greenland\" />"}'
                      >
                        Greenland
                      </option>
                      <option
                        value="GD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gd.png\" alt=\"Grenada\" />"}'
                      >
                        Grenada
                      </option>
                      <option
                        value="GP"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gp.png\" alt=\"Guadeloupe\" />"}'
                      >
                        Guadeloupe
                      </option>
                      <option
                        value="GU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gu.png\" alt=\"Guam\" />"}'
                      >
                        Guam
                      </option>
                      <option
                        value="GT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gt.png\" alt=\"Guatemala\" />"}'
                      >
                        Guatemala
                      </option>
                      <option
                        value="GG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gg.png\" alt=\"Guernsey\" />"}'
                      >
                        Guernsey
                      </option>
                      <option
                        value="GN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gn.png\" alt=\"Guinea\" />"}'
                      >
                        Guinea
                      </option>
                      <option
                        value="GW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gw.png\" alt=\"Guinea-Bissau\" />"}'
                      >
                        Guinea-Bissau
                      </option>
                      <option
                        value="GY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gy.png\" alt=\"Guyana\" />"}'
                      >
                        Guyana
                      </option>
                      <option
                        value="HT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ht.png\" alt=\"Haiti\" />"}'
                      >
                        Haiti
                      </option>
                      <option
                        value="VA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/va.png\" alt=\"Holy See\" />"}'
                      >
                        Holy See
                      </option>
                      <option
                        value="HN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/hn.png\" alt=\"Honduras\" />"}'
                      >
                        Honduras
                      </option>
                      <option
                        value="HK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/hk.png\" alt=\"Hong Kong\" />"}'
                      >
                        Hong Kong
                      </option>
                      <option
                        value="HU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/hu.png\" alt=\"Hungary\" />"}'
                      >
                        Hungary
                      </option>
                      <option
                        value="IS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/is.png\" alt=\"Iceland\" />"}'
                      >
                        Iceland
                      </option>
                      <option
                        value="IN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/in.png\" alt=\"India\" />"}'
                      >
                        India
                      </option>
                      <option
                        value="ID"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/id.png\" alt=\"Indonesia\" />"}'
                      >
                        Indonesia
                      </option>
                      <option
                        value="IR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ir.png\" alt=\"Iran (Islamic Republic of)\" />"}'
                      >
                        Iran (Islamic Republic of)
                      </option>
                      <option
                        value="IQ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/iq.png\" alt=\"Iraq\" />"}'
                      >
                        Iraq
                      </option>
                      <option
                        value="IE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ie.png\" alt=\"Ireland\" />"}'
                      >
                        Ireland
                      </option>
                      <option
                        value="IM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/im.png\" alt=\"Isle of Man\" />"}'
                      >
                        Isle of Man
                      </option>
                      <option
                        value="IL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/il.png\" alt=\"Israel\" />"}'
                      >
                        Israel
                      </option>
                      <option
                        value="IT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/it.png\" alt=\"Italy\" />"}'
                      >
                        Italy
                      </option>
                      <option
                        value="JM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/jm.png\" alt=\"Jamaica\" />"}'
                      >
                        Jamaica
                      </option>
                      <option
                        value="JP"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/jp.png\" alt=\"Japan\" />"}'
                      >
                        Japan
                      </option>
                      <option
                        value="JE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/je.png\" alt=\"Jersey\" />"}'
                      >
                        Jersey
                      </option>
                      <option
                        value="JO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/jo.png\" alt=\"Jordan\" />"}'
                      >
                        Jordan
                      </option>
                      <option
                        value="KZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kz.png\" alt=\"Kazakhstan\" />"}'
                      >
                        Kazakhstan
                      </option>
                      <option
                        value="KE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ke.png\" alt=\"Kenya\" />"}'
                      >
                        Kenya
                      </option>
                      <option
                        value="KI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ki.png\" alt=\"Kiribati\" />"}'
                      >
                        Kiribati
                      </option>
                      <option
                        value="KW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kw.png\" alt=\"Kuwait\" />"}'
                      >
                        Kuwait
                      </option>
                      <option
                        value="KG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kg.png\" alt=\"Kyrgyzstan\" />"}'
                      >
                        Kyrgyzstan
                      </option>
                      <option
                        value="LA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/la.png\" alt=\"Laos\" />"}'
                      >
                        Laos
                      </option>
                      <option
                        value="LV"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lv.png\" alt=\"Latvia\" />"}'
                      >
                        Latvia
                      </option>
                      <option
                        value="LB"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lb.png\" alt=\"Lebanon\" />"}'
                      >
                        Lebanon
                      </option>
                      <option
                        value="LS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ls.png\" alt=\"Lesotho\" />"}'
                      >
                        Lesotho
                      </option>
                      <option
                        value="LR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lr.png\" alt=\"Liberia\" />"}'
                      >
                        Liberia
                      </option>
                      <option
                        value="LY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ly.png\" alt=\"Libya\" />"}'
                      >
                        Libya
                      </option>
                      <option
                        value="LI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/li.png\" alt=\"Liechtenstein\" />"}'
                      >
                        Liechtenstein
                      </option>
                      <option
                        value="LT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lt.png\" alt=\"Lithuania\" />"}'
                      >
                        Lithuania
                      </option>
                      <option
                        value="LU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lu.png\" alt=\"Luxembourg\" />"}'
                      >
                        Luxembourg
                      </option>
                      <option
                        value="MO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mo.png\" alt=\"Macau\" />"}'
                      >
                        Macau
                      </option>
                      <option
                        value="MG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mg.png\" alt=\"Madagascar\" />"}'
                      >
                        Madagascar
                      </option>
                      <option
                        value="MW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mw.png\" alt=\"Malawi\" />"}'
                      >
                        Malawi
                      </option>
                      <option
                        value="MY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/my.png\" alt=\"Malaysia\" />"}'
                      >
                        Malaysia
                      </option>
                      <option
                        value="MV"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mv.png\" alt=\"Maldives\" />"}'
                      >
                        Maldives
                      </option>
                      <option
                        value="ML"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ml.png\" alt=\"Mali\" />"}'
                      >
                        Mali
                      </option>
                      <option
                        value="MT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mt.png\" alt=\"Malta\" />"}'
                      >
                        Malta
                      </option>
                      <option
                        value="MH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mh.png\" alt=\"Marshall Islands\" />"}'
                      >
                        Marshall Islands
                      </option>
                      <option
                        value="MQ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mq.png\" alt=\"Martinique\" />"}'
                      >
                        Martinique
                      </option>
                      <option
                        value="MR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mr.png\" alt=\"Mauritania\" />"}'
                      >
                        Mauritania
                      </option>
                      <option
                        value="MU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mu.png\" alt=\"Mauritius\" />"}'
                      >
                        Mauritius
                      </option>
                      <option
                        value="YT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/yt.png\" alt=\"Mayotte\" />"}'
                      >
                        Mayotte
                      </option>
                      <option
                        value="MX"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mx.png\" alt=\"Mexico\" />"}'
                      >
                        Mexico
                      </option>
                      <option
                        value="MD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/md.png\" alt=\"Moldova\" />"}'
                      >
                        Moldova
                      </option>
                      <option
                        value="MC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mc.png\" alt=\"Monaco\" />"}'
                      >
                        Monaco
                      </option>
                      <option
                        value="MN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mn.png\" alt=\"Mongolia\" />"}'
                      >
                        Mongolia
                      </option>
                      <option
                        value="ME"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/me.png\" alt=\"Montenegro\" />"}'
                      >
                        Montenegro
                      </option>
                      <option
                        value="MS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ms.png\" alt=\"Montserrat\" />"}'
                      >
                        Montserrat
                      </option>
                      <option
                        value="MA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ma.png\" alt=\"Morocco\" />"}'
                      >
                        Morocco
                      </option>
                      <option
                        value="MZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mz.png\" alt=\"Mozambique\" />"}'
                      >
                        Mozambique
                      </option>
                      <option
                        value="MM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mm.png\" alt=\"Myanmar\" />"}'
                      >
                        Myanmar
                      </option>
                      <option
                        value="NA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/na.png\" alt=\"Namibia\" />"}'
                      >
                        Namibia
                      </option>
                      <option
                        value="NR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/nr.png\" alt=\"Nauru\" />"}'
                      >
                        Nauru
                      </option>
                      <option
                        value="NP"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/np.png\" alt=\"Nepal\" />"}'
                      >
                        Nepal
                      </option>
                      <option
                        value="NL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/nl.png\" alt=\"Netherlands\" />"}'
                      >
                        Netherlands
                      </option>
                      <option
                        value="NC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/nc.png\" alt=\"New Caledonia\" />"}'
                      >
                        New Caledonia
                      </option>
                      <option
                        value="NZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/nz.png\" alt=\"New Zealand\" />"}'
                      >
                        New Zealand
                      </option>
                      <option
                        value="NI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ni.png\" alt=\"Nicaragua\" />"}'
                      >
                        Nicaragua
                      </option>
                      <option
                        value="NE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ne.png\" alt=\"Niger\" />"}'
                      >
                        Niger
                      </option>
                      <option
                        value="NG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ng.png\" alt=\"Nigeria\" />"}'
                      >
                        Nigeria
                      </option>
                      <option
                        value="NU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/nu.png\" alt=\"Niue\" />"}'
                      >
                        Niue
                      </option>
                      <option
                        value="NF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/nf.png\" alt=\"Norfolk Island\" />"}'
                      >
                        Norfolk Island
                      </option>
                      <option
                        value="KP"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kp.png\" alt=\"North Korea\" />"}'
                      >
                        North Korea
                      </option>
                      <option
                        value="MK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mk.png\" alt=\"North Macedonia\" />"}'
                      >
                        North Macedonia
                      </option>
                      <option
                        value="GB-NIR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Northern Ireland\" />"}'
                      >
                        Northern Ireland
                      </option>
                      <option
                        value="MP"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mp.png\" alt=\"Northern Mariana Islands\" />"}'
                      >
                        Northern Mariana Islands
                      </option>
                      <option
                        value="NO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/no.png\" alt=\"Norway\" />"}'
                      >
                        Norway
                      </option>
                      <option
                        value="OM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/om.png\" alt=\"Oman\" />"}'
                      >
                        Oman
                      </option>
                      <option
                        value="PK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pk.png\" alt=\"Pakistan\" />"}'
                      >
                        Pakistan
                      </option>
                      <option
                        value="PW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pw.png\" alt=\"Palau\" />"}'
                      >
                        Palau
                      </option>
                      <option
                        value="PA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pa.png\" alt=\"Panama\" />"}'
                      >
                        Panama
                      </option>
                      <option
                        value="PG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pg.png\" alt=\"Papua New Guinea\" />"}'
                      >
                        Papua New Guinea
                      </option>
                      <option
                        value="PY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/py.png\" alt=\"Paraguay\" />"}'
                      >
                        Paraguay
                      </option>
                      <option
                        value="PE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pe.png\" alt=\"Peru\" />"}'
                      >
                        Peru
                      </option>
                      <option
                        value="PH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ph.png\" alt=\"Philippines\" />"}'
                      >
                        Philippines
                      </option>
                      <option
                        value="PN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pn.png\" alt=\"Pitcairn\" />"}'
                      >
                        Pitcairn
                      </option>
                      <option
                        value="PL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pl.png\" alt=\"Poland\" />"}'
                      >
                        Poland
                      </option>
                      <option
                        value="PT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pt.png\" alt=\"Portugal\" />"}'
                      >
                        Portugal
                      </option>
                      <option
                        value="PR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pr.png\" alt=\"Puerto Rico\" />"}'
                      >
                        Puerto Rico
                      </option>
                      <option
                        value="QA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/qa.png\" alt=\"Qatar\" />"}'
                      >
                        Qatar
                      </option>
                      <option
                        value="CG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/cg.png\" alt=\"Republic of the Congo\" />"}'
                      >
                        Republic of the Congo
                      </option>
                      <option
                        value="RO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ro.png\" alt=\"Romania\" />"}'
                      >
                        Romania
                      </option>
                      <option
                        value="RU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ru.png\" alt=\"Russia\" />"}'
                      >
                        Russia
                      </option>
                      <option
                        value="RW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/rw.png\" alt=\"Rwanda\" />"}'
                      >
                        Rwanda
                      </option>
                      <option
                        value="RE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/re.png\" alt=\"Réunion\" />"}'
                      >
                        Réunion
                      </option>
                      <option
                        value="BL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/bl.png\" alt=\"Saint Barthélemy\" />"}'
                      >
                        Saint Barthélemy
                      </option>
                      <option
                        value="SH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sh.png\" alt=\"Saint Helena, Ascension and Tristan da Cunha\" />"}'
                      >
                        Saint Helena, Ascension and Tristan da Cunha
                      </option>
                      <option
                        value="KN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kn.png\" alt=\"Saint Kitts and Nevis\" />"}'
                      >
                        Saint Kitts and Nevis
                      </option>
                      <option
                        value="LC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lc.png\" alt=\"Saint Lucia\" />"}'
                      >
                        Saint Lucia
                      </option>
                      <option
                        value="MF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/mf.png\" alt=\"Saint Martin\" />"}'
                      >
                        Saint Martin
                      </option>
                      <option
                        value="PM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/pm.png\" alt=\"Saint Pierre and Miquelon\" />"}'
                      >
                        Saint Pierre and Miquelon
                      </option>
                      <option
                        value="VC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/vc.png\" alt=\"Saint Vincent and the Grenadines\" />"}'
                      >
                        Saint Vincent and the Grenadines
                      </option>
                      <option
                        value="WS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ws.png\" alt=\"Samoa\" />"}'
                      >
                        Samoa
                      </option>
                      <option
                        value="SM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sm.png\" alt=\"San Marino\" />"}'
                      >
                        San Marino
                      </option>
                      <option
                        value="ST"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/st.png\" alt=\"Sao Tome and Principe\" />"}'
                      >
                        Sao Tome and Principe
                      </option>
                      <option
                        value="SA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sa.png\" alt=\"Saudi Arabia\" />"}'
                      >
                        Saudi Arabia
                      </option>
                      <option
                        value="GB-SCT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Scotland\" />"}'
                      >
                        Scotland
                      </option>
                      <option
                        value="SN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sn.png\" alt=\"Senegal\" />"}'
                      >
                        Senegal
                      </option>
                      <option
                        value="RS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/rs.png\" alt=\"Serbia\" />"}'
                      >
                        Serbia
                      </option>
                      <option
                        value="SC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sc.png\" alt=\"Seychelles\" />"}'
                      >
                        Seychelles
                      </option>
                      <option
                        value="SL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sl.png\" alt=\"Sierra Leone\" />"}'
                      >
                        Sierra Leone
                      </option>
                      <option
                        value="SG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sg.png\" alt=\"Singapore\" />"}'
                      >
                        Singapore
                      </option>
                      <option
                        value="SX"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sx.png\" alt=\"Sint Maarten\" />"}'
                      >
                        Sint Maarten
                      </option>
                      <option
                        value="SK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sk.png\" alt=\"Slovakia\" />"}'
                      >
                        Slovakia
                      </option>
                      <option
                        value="SI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/si.png\" alt=\"Slovenia\" />"}'
                      >
                        Slovenia
                      </option>
                      <option
                        value="SB"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sb.png\" alt=\"Solomon Islands\" />"}'
                      >
                        Solomon Islands
                      </option>
                      <option
                        value="SO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/so.png\" alt=\"Somalia\" />"}'
                      >
                        Somalia
                      </option>
                      <option
                        value="ZA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/za.png\" alt=\"South Africa\" />"}'
                      >
                        South Africa
                      </option>
                      <option
                        value="GS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gs.png\" alt=\"South Georgia and the South Sandwich Islands\" />"}'
                      >
                        South Georgia and the South Sandwich Islands
                      </option>
                      <option
                        value="KR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/kr.png\" alt=\"South Korea\" />"}'
                      >
                        South Korea
                      </option>
                      <option
                        value="SS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ss.png\" alt=\"South Sudan\" />"}'
                      >
                        South Sudan
                      </option>
                      <option
                        value="ES"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/es.png\" alt=\"Spain\" />"}'
                      >
                        Spain
                      </option>
                      <option
                        value="LK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/lk.png\" alt=\"Sri Lanka\" />"}'
                      >
                        Sri Lanka
                      </option>
                      <option
                        value="PS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ps.png\" alt=\"State of Palestine\" />"}'
                      >
                        State of Palestine
                      </option>
                      <option
                        value="SD"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sd.png\" alt=\"Sudan\" />"}'
                      >
                        Sudan
                      </option>
                      <option
                        value="SR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sr.png\" alt=\"Suriname\" />"}'
                      >
                        Suriname
                      </option>
                      <option
                        value="SJ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sj.png\" alt=\"Svalbard and Jan Mayen\" />"}'
                      >
                        Svalbard and Jan Mayen
                      </option>
                      <option
                        value="SZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sz.png\" alt=\"Swaziland\" />"}'
                      >
                        Swaziland
                      </option>
                      <option
                        value="SE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/se.png\" alt=\"Sweden\" />"}'
                      >
                        Sweden
                      </option>
                      <option
                        value="CH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ch.png\" alt=\"Switzerland\" />"}'
                      >
                        Switzerland
                      </option>
                      <option
                        value="SY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/sy.png\" alt=\"Syrian Arab Republic\" />"}'
                      >
                        Syrian Arab Republic
                      </option>
                      <option
                        value="TW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tw.png\" alt=\"Taiwan\" />"}'
                      >
                        Taiwan
                      </option>
                      <option
                        value="TJ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tj.png\" alt=\"Tajikistan\" />"}'
                      >
                        Tajikistan
                      </option>
                      <option
                        value="TZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tz.png\" alt=\"Tanzania\" />"}'
                      >
                        Tanzania
                      </option>
                      <option
                        value="TH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/th.png\" alt=\"Thailand\" />"}'
                      >
                        Thailand
                      </option>
                      <option
                        value="TL"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tl.png\" alt=\"Timor-Leste\" />"}'
                      >
                        Timor-Leste
                      </option>
                      <option
                        value="TG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tg.png\" alt=\"Togo\" />"}'
                      >
                        Togo
                      </option>
                      <option
                        value="TK"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tk.png\" alt=\"Tokelau\" />"}'
                      >
                        Tokelau
                      </option>
                      <option
                        value="TO"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/to.png\" alt=\"Tonga\" />"}'
                      >
                        Tonga
                      </option>
                      <option
                        value="TT"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tt.png\" alt=\"Trinidad and Tobago\" />"}'
                      >
                        Trinidad and Tobago
                      </option>
                      <option
                        value="TN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tn.png\" alt=\"Tunisia\" />"}'
                      >
                        Tunisia
                      </option>
                      <option
                        value="TR"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tr.png\" alt=\"Turkey\" />"}'
                      >
                        Turkey
                      </option>
                      <option
                        value="TM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tm.png\" alt=\"Turkmenistan\" />"}'
                      >
                        Turkmenistan
                      </option>
                      <option
                        value="TC"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tc.png\" alt=\"Turks and Caicos Islands\" />"}'
                      >
                        Turks and Caicos Islands
                      </option>
                      <option
                        value="TV"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/tv.png\" alt=\"Tuvalu\" />"}'
                      >
                        Tuvalu
                      </option>
                      <option
                        value="UG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ug.png\" alt=\"Uganda\" />"}'
                      >
                        Uganda
                      </option>
                      <option
                        value="UA"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ua.png\" alt=\"Ukraine\" />"}'
                      >
                        Ukraine
                      </option>
                      <option
                        value="AE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ae.png\" alt=\"United Arab Emirates\" />"}'
                      >
                        United Arab Emirates
                      </option>
                      <option
                        value="GB"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"United Kingdom\" />"}'
                      >
                        United Kingdom
                      </option>
                      <option
                        value="UM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/um.png\" alt=\"United States Minor Outlying Islands\" />"}'
                      >
                        United States Minor Outlying Islands
                      </option>
                      <option
                        value="US"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/us.png\" alt=\"United States of America\" />"}'
                      >
                        United States of America
                      </option>
                      <option
                        value="UY"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/uy.png\" alt=\"Uruguay\" />"}'
                      >
                        Uruguay
                      </option>
                      <option
                        value="UZ"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/uz.png\" alt=\"Uzbekistan\" />"}'
                      >
                        Uzbekistan
                      </option>
                      <option
                        value="VU"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/vu.png\" alt=\"Vanuatu\" />"}'
                      >
                        Vanuatu
                      </option>
                      <option
                        value="VE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ve.png\" alt=\"Venezuela (Bolivarian Republic of)\" />"}'
                      >
                        Venezuela (Bolivarian Republic of)
                      </option>
                      <option
                        value="VN"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/vn.png\" alt=\"Vietnam\" />"}'
                      >
                        Vietnam
                      </option>
                      <option
                        value="VG"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/vg.png\" alt=\"Virgin Islands (British)\" />"}'
                      >
                        Virgin Islands (British)
                      </option>
                      <option
                        value="VI"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/vi.png\" alt=\"Virgin Islands (U.S.)\" />"}'
                      >
                        Virgin Islands (U.S.)
                      </option>
                      <option
                        value="GB-WLS"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Wales\" />"}'
                      >
                        Wales
                      </option>
                      <option
                        value="WF"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/wf.png\" alt=\"Wallis and Futuna\" />"}'
                      >
                        Wallis and Futuna
                      </option>
                      <option
                        value="EH"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/eh.png\" alt=\"Western Sahara\" />"}'
                      >
                        Western Sahara
                      </option>
                      <option
                        value="YE"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/ye.png\" alt=\"Yemen\" />"}'
                      >
                        Yemen
                      </option>
                      <option
                        value="ZM"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/zm.png\" alt=\"Zambia\" />"}'
                      >
                        Zambia
                      </option>
                      <option
                        value="ZW"
                        data-hs-select-option='{
                      "icon": "<img class=\"ykxda ufena lli30 \" src=\"../../assets/vendor/svg-country-flags/png100px/zw.png\" alt=\"Zimbabwe\" />"}'
                      >
                        Zimbabwe
                      </option>
                    </select>

                    <div className="absolute cn1sr rc2yk -translate-y-1/2">
                      <svg
                        className="h21yx vs0hq z1v6e dark:text-neutral-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m7 15 5 5 5-5" />
                        <path d="m7 9 5-5 5 5" />
                      </svg>
                    </div>
                  </div>
                  {/* <!-- End Select --> */}
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Button Group --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2"></div>

                <div className="tg5r3 it0w6">
                  <div className="flex u96nv">
                    <button
                      type="button"
                      className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t xk8dv uylzq hrliy wa7ya xwjcj c3i4e r0fp5 dg2gp xp6ug"
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- End Button Group --> */}
            </div>
            {/* <!-- End Personal Info --> */}

            {/* <!-- Password --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              <div className="s2k2k items-center dsp0o">
                <h2 className="rozsb p9tun dark:text-neutral-200">Password</h2>

                {/* <!-- Tooltip --> */}
                <div className="hs-tooltip ykxda">
                  <svg
                    className="hs-tooltip-toggle h21yx if1eb towde z1v6e dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  <div
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 ushts ykxda absolute wb6jx temqr u3doq bgglq m9vu4 dxf1r kbafc dark:bg-neutral-900 dark:text-neutral-400"
                    role="tooltip"
                  >
                    <p className="f4yq1 p9tun dark:text-neutral-200">
                      Password requirements:
                    </p>
                    <p className="jatgu pdak6 y33fp z1v6e dark:text-neutral-400">
                      Ensure that these requirements are met:
                    </p>
                    <ul className="jatgu e7a20 xuyq5 mirge pdak6 y33fp z1v6e dark:text-neutral-400">
                      <li>Minimum 8 characters long - the more, the better</li>
                      <li>At least one j1m58 character</li>
                      <li>At least one yf7yl character</li>
                      <li>
                        At least one number, symbol, or whitespace character
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!-- End Tooltip --> */}
              </div>

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Current password
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  {/* <!-- Input --> */}
                  <div className="relative">
                    <input
                      id="hs-pro-dappcp"
                      type="text"
                      className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      data-hs-toggle-password='{
                      "target": "#hs-pro-dappcp"
                    }'
                      className="absolute hx55d celeo flex items-center l2wpd viac4 cursor-pointer pal0s k7wsw r0fp5 oh1at dark:text-neutral-600 dark:focus:text-blue-500"
                    >
                      <svg
                        className="h21yx vs0hq"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          className="hs-password-active:hidden"
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        />
                        <path
                          className="hs-password-active:hidden"
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                          className="hs-password-active:hidden"
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line
                          className="hs-password-active:hidden"
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        />
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle
                          className="hidden hs-password-active:block"
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* <!-- End Input --> */}
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    New password
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <div data-hs-toggle-password-group className="wvkwg">
                    {/* <!-- Input --> */}
                    <div className="relative">
                      <input
                        id="hs-pro-dappnp"
                        type="text"
                        className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        data-hs-toggle-password='{
                        "target": ["#hs-pro-dappnp", "#hs-pro-dapprnp"]
                      }'
                        className="absolute hx55d celeo flex items-center l2wpd viac4 cursor-pointer pal0s k7wsw r0fp5 oh1at dark:text-neutral-600 dark:focus:text-blue-500"
                      >
                        <svg
                          className="h21yx vs0hq"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            className="hs-password-active:hidden"
                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                          />
                          <path
                            className="hs-password-active:hidden"
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                          />
                          <path
                            className="hs-password-active:hidden"
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                          />
                          <line
                            className="hs-password-active:hidden"
                            x1="2"
                            x2="22"
                            y1="2"
                            y2="22"
                          />
                          <path
                            className="hidden hs-password-active:block"
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                          />
                          <circle
                            className="hidden hs-password-active:block"
                            cx="12"
                            cy="12"
                            r="3"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* <!-- End Input --> */}

                    {/* <!-- Input --> */}
                    <div className="relative">
                      <input
                        id="hs-pro-dapprnp"
                        type="text"
                        className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Repeat new password"
                      />
                      <button
                        type="button"
                        data-hs-toggle-password='{
                        "target": ["#hs-pro-dappnp", "#hs-pro-dapprnp"]
                      }'
                        className="absolute hx55d celeo flex items-center l2wpd viac4 cursor-pointer pal0s k7wsw r0fp5 oh1at dark:text-neutral-600 dark:focus:text-blue-500"
                      >
                        <svg
                          className="h21yx vs0hq"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            className="hs-password-active:hidden"
                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                          />
                          <path
                            className="hs-password-active:hidden"
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                          />
                          <path
                            className="hs-password-active:hidden"
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                          />
                          <line
                            className="hs-password-active:hidden"
                            x1="2"
                            x2="22"
                            y1="2"
                            y2="22"
                          />
                          <path
                            className="hidden hs-password-active:block"
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                          />
                          <circle
                            className="hidden hs-password-active:block"
                            cx="12"
                            cy="12"
                            r="3"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* <!-- End Input --> */}

                    <div
                      data-hs-strong-password='{
                        "target": "#hs-pro-dappnp",
                        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 fiztv t1bzs lli30 hkwxm pp2bm j665t"
                      }'
                      className="flex jglyo -mx-1"
                    ></div>

                    <p className="pdak6 tqixq dark:text-neutral-400">
                      Level: <span></span>
                    </p>

                    {/* <!-- Button Group --> */}
                    <div className="flex items-center u96nv">
                      <button
                        type="button"
                        className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t xk8dv uylzq hrliy wa7ya xwjcj c3i4e r0fp5 dg2gp xp6ug"
                      >
                        Change
                      </button>
                      <a
                        className="pdak6 oqj39 n68l9 lcels f4yq1 r0fp5 ay3io dark:text-blue-400 dark:hover:text-blue-500"
                        href="#"
                      >
                        I forgot my password
                      </a>
                    </div>
                    {/* <!-- End Button Group --> */}
                  </div>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Password --> */}

            {/* <!-- Social Accounts --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              <h2 className="rozsb p9tun dark:text-neutral-200">
                Social accounts
              </h2>

              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    URL
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <div className="wvkwg">
                    <div id="hs-wrapper-for-copy" className="wvkwg">
                      <input
                        id="hs-pro-dapsaurl"
                        type="text"
                        className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Link to social profile"
                      />
                      <input
                        type="text"
                        className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Link to social profile"
                      />
                      <input
                        id="hs-content-for-copy"
                        type="text"
                        className="bdby8 viac4 block qaxp8 kq7zk awdil pdak6 aqt2b lj756 xp6ug xwjcj c3i4e dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Link to social profile"
                      />
                    </div>

                    {/* <!-- Add Link --> */}
                    <p className="nc0x2">
                      <button
                        type="button"
                        data-hs-copy-markup='{
                        "targetSelector": "#hs-content-for-copy",
                        "wrapperSelector": "#hs-wrapper-for-copy",
                        "limit": 4
                      }'
                        className="y027u cr73y s2k2k items-center ernqe bqo3s f4yq1 lli30 efs5t sx2o3 kq7zk m9vu4 p9tun r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="h21yx towde"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Add link
                      </button>
                    </p>
                    {/* <!-- End Add Link --> */}
                  </div>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Social Accounts --> */}

            {/* <!-- Connect Accounts --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Connect accounts
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  {/* <!-- Button Group --> */}
                  <div className="flex pz3xv ool6k wn51l">
                    <button
                      type="button"
                      className="bdby8 viac4 s2k2k dry15 items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="ufena"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_4132_5805)">
                          <path
                            d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z"
                            fill="#34A853"
                          />
                          <path
                            d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z"
                            fill="#EB4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4132_5805">
                            <rect
                              width="32"
                              height="32"
                              fill="white"
                              transform="translate(0.937439)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Remove Google
                      <svg
                        className="h21yx towde z1v6e dark:text-neutral-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="bdby8 viac4 s2k2k dry15 items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="ufena"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.7326 0C9.96372 0.00130479 8.53211 1.43397 8.53342 3.19935C8.53211 4.96473 9.96503 6.39739 11.7339 6.39869H14.9345V3.20065C14.9358 1.43527 13.5029 0.00260958 11.7326 0C11.7339 0 11.7339 0 11.7326 0M11.7326 8.53333H3.20053C1.43161 8.53464 -0.00130383 9.9673 3.57297e-06 11.7327C-0.00261123 13.4981 1.4303 14.9307 3.19922 14.9333H11.7326C13.5016 14.932 14.9345 13.4994 14.9332 11.734C14.9345 9.9673 13.5016 8.53464 11.7326 8.53333Z"
                          fill="#36C5F0"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M32 11.7327C32.0013 9.9673 30.5684 8.53464 28.7995 8.53333C27.0306 8.53464 25.5976 9.9673 25.5989 11.7327V14.9333H28.7995C30.5684 14.932 32.0013 13.4994 32 11.7327ZM23.4666 11.7327V3.19935C23.4679 1.43527 22.0363 0.00260958 20.2674 0C18.4984 0.00130479 17.0655 1.43397 17.0668 3.19935V11.7327C17.0642 13.4981 18.4971 14.9307 20.2661 14.9333C22.035 14.932 23.4679 13.4994 23.4666 11.7327Z"
                          fill="#2EB67D"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20.2661 32C22.035 31.9987 23.4679 30.566 23.4666 28.8007C23.4679 27.0353 22.035 25.6026 20.2661 25.6013H17.0656V28.8007C17.0642 30.5647 18.4972 31.9974 20.2661 32ZM20.2661 23.4654H28.7995C30.5684 23.4641 32.0013 22.0314 32 20.266C32.0026 18.5006 30.5697 17.068 28.8008 17.0654H20.2674C18.4985 17.0667 17.0656 18.4993 17.0669 20.2647C17.0656 22.0314 18.4972 23.4641 20.2661 23.4654Z"
                          fill="#ECB22E"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.93953e-07 20.266C-0.00130651 22.0314 1.43161 23.4641 3.20052 23.4654C4.96944 23.4641 6.40235 22.0314 6.40105 20.266V17.0667H3.20052C1.43161 17.068 -0.00130651 18.5006 8.93953e-07 20.266ZM8.53342 20.266V28.7993C8.5308 30.5647 9.96372 31.9974 11.7326 32C13.5016 31.9987 14.9345 30.566 14.9332 28.8007V20.2686C14.9358 18.5032 13.5029 17.0706 11.7339 17.068C9.96372 17.068 8.53211 18.5006 8.53342 20.266C8.53342 20.2673 8.53342 20.266 8.53342 20.266Z"
                          fill="#E01E5A"
                        />
                      </svg>
                      Connect with Slack
                    </button>
                  </div>
                  {/* <!-- End Button Group --> */}

                  <p className="nc0x2 pdak6 z1v6e dark:text-neutral-500">
                    Access your Preline Workspaces with any email address, or by
                    connecting an account.
                  </p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Connect Accounts --> */}

            {/* <!-- Two-Step Verification --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="qpfd9 ykxda pdak6 z1v6e dark:text-neutral-500">
                    Two-Step Verification
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  {/* <!-- Alert --> */}
                  <div
                    className="u3doq mjlql oqj39 awdil qb0ai"
                    role="alert"
                    aria-labelledby="hs-pro-dasfaaoea-label"
                  >
                    <div className="flex">
                      <svg
                        className="h21yx dpsu3 jatgu"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <div className="d9qfm wvkwg">
                        <h3
                          id="hs-pro-dasfaaoea-label"
                          className="pdak6 oqj39 dark:text-blue-500"
                        >
                          Advanced security features are available on Enterprise
                        </h3>
                        <button
                          type="button"
                          className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t xk8dv uylzq hrliy wa7ya xwjcj c3i4e r0fp5 dg2gp xp6ug"
                        >
                          <svg
                            className="h21yx towde"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                          </svg>
                          Upgrade
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Alert --> */}
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Two-Step Verification --> */}

            {/* <!-- Disable Ads --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="ykxda pdak6 z1v6e dark:text-neutral-500">
                    Disable Ads
                    <span className="if1eb s2k2k items-center ihu9y k3en6 twx0a f4yq1 uylzq hrliy lli30 dark:bg-blue-500">
                      PRO
                    </span>
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <div className="xo0h3 flex">
                    <input
                      type="checkbox"
                      className="h21yx kq7zk vs0hq fa0ty oqj39 di1ey dark:bg-neutral-800 dark:checked:bg-blue-500 dark:border-neutral-700"
                      id="hs-pro-dapdach"
                    />
                    <label className="bqo3s tqixq vzx5m dark:text-neutral-400">
                      With your Pro account, you can disable ads across the
                      site.
                    </label>
                  </div>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Disable Ads --> */}

            {/* <!-- Sessions --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf 2xl:gap-y-0 m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="ykxda pdak6 z1v6e dark:text-neutral-500">
                    Sessions
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 2xl:col-span-10">
                  {/* <!-- Grid --> */}
                  <div className="i80r8 uuuw0 2xl:grid-cols-3 m12op">
                    {/* <!-- Card --> */}
                    <div className="lc5w1 rkm5u flex pz3xv m9vu4 efs5t kq7zk dxf1r dark:bg-neutral-800 dark:border-neutral-700">
                      {/* <!-- Header --> */}
                      <div className="flex m0bgt">
                        <div className="flex pz3xv dry15 items-center fs5ha efs5t kq7zk awdil dark:border-neutral-700">
                          <svg
                            className="dpsu3 z1v6e dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                          </svg>
                        </div>

                        <button
                          type="button"
                          className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        >
                          <svg
                            className="h21yx towde"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                      {/* <!-- End Header --> */}

                      {/* <!-- Heading --> */}
                      <div className="flex m0bgt items-center">
                        <span className="f4yq1 p9tun dark:text-neutral-200">
                          Mac
                        </span>
                        <span className="s2k2k items-center gul2i k0z3y cr73y bqo3s f4yq1 ni0i3 j8604 lli30 dark:bg-blue-500/10 dark:text-blue-500">
                          Current session
                        </span>
                      </div>
                      {/* <!-- End Heading --> */}

                      {/* <!-- List Group --> */}
                      <ul className="wvkwg">
                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Location:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            United Kingdom
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Device:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            Safari - iOS
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            IP address:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            129.562.028.172
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Recent activity:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            5 minutes ago
                          </span>
                        </li>
                      </ul>
                      {/* <!-- End List Group --> */}

                      <button
                        type="button"
                        className="bdby8 viac4 qaxp8 s2k2k dry15 items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="h21yx ufena"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                        Don’t recognize something?
                      </button>
                    </div>
                    {/* <!-- End Card --> */}

                    {/* <!-- Card --> */}
                    <div className="lc5w1 rkm5u flex pz3xv m9vu4 efs5t kq7zk dxf1r dark:bg-neutral-800 dark:border-neutral-700">
                      {/* <!-- Header --> */}
                      <div className="flex m0bgt">
                        <div className="flex pz3xv dry15 items-center fs5ha efs5t kq7zk awdil dark:border-neutral-700">
                          <svg
                            className="dpsu3 z1v6e dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                          </svg>
                        </div>

                        <button
                          type="button"
                          className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        >
                          <svg
                            className="h21yx towde"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                      {/* <!-- End Header --> */}

                      {/* <!-- Heading --> */}
                      <div className="flex m0bgt items-center">
                        <span className="f4yq1 p9tun dark:text-neutral-200">
                          Mac
                        </span>

                        <span className="s2k2k items-center gul2i k0z3y cr73y bqo3s f4yq1 ac0xq p9tun lli30 dark:bg-neutral-700 dark:text-neutral-200">
                          Expired
                        </span>
                      </div>
                      {/* <!-- End Heading --> */}

                      {/* <!-- List Group --> */}
                      <ul className="wvkwg">
                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Location:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            United Kingdom
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Device:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            Safari - iOS
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            IP address:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            129.562.028.172
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Recent activity:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            1 month ago
                          </span>
                        </li>
                      </ul>
                      {/* <!-- End List Group --> */}

                      <button
                        type="button"
                        className="bdby8 viac4 qaxp8 s2k2k dry15 items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="h21yx ufena"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                        Don’t recognize something?
                      </button>
                    </div>
                    {/* <!-- End Card --> */}

                    {/* <!-- Card --> */}
                    <div className="lc5w1 rkm5u flex pz3xv m9vu4 efs5t kq7zk dxf1r dark:bg-neutral-800 dark:border-neutral-700">
                      {/* <!-- Header --> */}
                      <div className="flex m0bgt">
                        <div className="flex pz3xv dry15 items-center fs5ha efs5t kq7zk awdil dark:border-neutral-700">
                          <svg
                            className="dpsu3 z1v6e dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <rect
                              width="16"
                              height="20"
                              x="4"
                              y="2"
                              rx="2"
                              ry="2"
                            />
                            <line x1="12" x2="12.01" y1="18" y2="18" />
                          </svg>
                        </div>

                        <button
                          type="button"
                          className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        >
                          <svg
                            className="h21yx towde"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                      {/* <!-- End Header --> */}

                      {/* <!-- Heading --> */}
                      <div className="flex m0bgt items-center">
                        <span className="f4yq1 p9tun dark:text-neutral-200">
                          iPad PRO
                        </span>
                      </div>
                      {/* <!-- End Heading --> */}

                      {/* <!-- List Group --> */}
                      <ul className="wvkwg">
                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Location:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            United Kingdom
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Device:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            Safari - iOS
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            IP address:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            129.562.028.172
                          </span>
                        </li>

                        <li className="flex m0bgt items-center">
                          <span className="bqo3s yf7yl z1v6e dark:text-neutral-500">
                            Recent activity:
                          </span>
                          <span className="pdak6 p9tun dark:text-neutral-200">
                            2 days ago
                          </span>
                        </li>
                      </ul>
                      {/* <!-- End List Group --> */}

                      <button
                        type="button"
                        className="bdby8 viac4 qaxp8 s2k2k dry15 items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 p9tun ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="h21yx ufena"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                        Don’t recognize something?
                      </button>
                    </div>
                    {/* <!-- End Card --> */}
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Sessions --> */}

            {/* <!-- Danger Zone --> */}
            <div className="gpz9t yp25u g0okh batcw kq7zk pw970 dark:border-neutral-700">
              {/* <!-- Grid --> */}
              <div className="i80r8 j3deg pjmzf bdi6j m23cl">
                <div className="s23ab ahzd4 2xl:col-span-2">
                  <label className="ykxda pdak6 z1v6e dark:text-neutral-500">
                    Danger zone
                  </label>
                </div>
                {/* <!-- End Col --> */}

                <div className="tg5r3 it0w6">
                  <button
                    type="button"
                    className="bdby8 viac4 s2k2k items-center dsp0o pdak6 f4yq1 awdil efs5t kq7zk m9vu4 yxkwm ycht7 r73cx xwjcj c3i4e r0fp5 ckvf9 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    Delete my account
                  </button>

                  <p className="nc0x2 pdak6 z1v6e dark:text-neutral-500">
                    This will immediately delete all of your data. This action
                    is not reversible, so please continue with caution.{" "}
                    <a
                      className="pdak6 oqj39 n68l9 lcels f4yq1 r0fp5 ay3io dark:text-blue-400 dark:hover:text-blue-500"
                      href="#"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Danger Zone --> */}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;