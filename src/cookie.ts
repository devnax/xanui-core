// cookieUtils.ts
const Cookie = {
   /**
    * Set a cookie
    * @param name - cookie name
    * @param value - cookie value
    * @param days - optional, number of days to expire, default 36500 (~100 years)
    */
   set: (name: string, value: string, days = 36500) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
   },

   /**
    * Get a cookie by name
    * @param name - cookie name
    * @returns value or null
    */
   // get: (name: string) => {
   //    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
   //    return match ? decodeURIComponent(match[1]) : null;
   // },

   /**
    * Delete a cookie
    * @param name - cookie name
    */
   // delete: (name: string) => {
   //    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
   // },

   /**
    * Check if a cookie exists
    * @param name - cookie name
    * @returns boolean
    */
   exists: (name: string) => {
      return document.cookie.split("; ").some(c => c.startsWith(`${name}=`));
   }
};

export default Cookie