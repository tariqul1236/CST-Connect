/**
 * Official CST Connect Android APK Configuration
 *
 * GitHub Actions workflow (`.github/workflows/build-apk.yml`) থেকে তৈরি হওয়া
 * আসল compiled Android APK-র stable direct download URL।
 *
 * GitHub Release stable URL ফরম্যাট:
 * https://github.com/USERNAME/CST-Connect/releases/latest/download/CST-Connect.apk
 */

// আপনার GitHub Username ও Repository Name
export const GITHUB_USERNAME = "khan56865686";
export const GITHUB_REPO = "CST-Connect";

// Stable direct download URL for the compiled CST-Connect.apk
export const APK_DOWNLOAD_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APK_DOWNLOAD_URL) ||
  `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/releases/latest/download/CST-Connect.apk`;
