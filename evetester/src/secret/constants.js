// EVE ONLINE ESI details for MANAGER app created with alt 4
// https://developers.eveonline.com/applications/details/71279
export const CLIENT_ID = "db266e43407749e38561264b3e22522f";
export const SECRET_KEY = "vO5InCThwSytMMKDZO4ZKETRbtT722pAENhOBE9H";
export const CALLBACK_URL = "http://localhost:3000/logsuccess";
export const STATE = "afsg78t6y9adsgg876ta89";
export const SCOPES = [
    "esi-skills.read_skillqueue.v1",
    "esi-characters.read_agents_research.v1",
    "esi-industry.read_character_jobs.v1",
    "esi-characters.read_blueprints.v1",
    "esi-industry.read_character_mining.v1"
];











/* YouTuber Notes -- pengo1998
    YouTuber uses php for his example and in video 1 shows how he set up his version of this "constants" page:
        -- data.php --
        <?php
        $cid = "afdgsdfhadfgsdfhst";
        $secretKey = "erhsdfghsfhngdfhngdfhg";
        $callback = "http://localhost:8005/evecallback.php";
        ---------------------------------------------------------
        video 2, he created a few file for his GET and POST requests
        -- Request.php --
        <?php
        class Request {
            static function GET($header, $url) {
                // was formerly GET($header, $userAgent, $url)
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                // curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
                curl_setopt($ch, CURLOPT_USERAGENT, "pengo1998");
                curl_setopt($ch, CURLOPT_HTTPHEADER, array($header));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
                $result = curl_exec($ch);
                if($result === false) {
                    curl_error($ch);
                    curl_close($ch);
                    return false;
                }
                curl_close($ch);
                return json_decode($result);
            }

            static function POST($header, $url, $fields, $fields_string) {
                // was formerly POST($header, $userAgent, $url, $fields, $fields_string)
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                // curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
                curl_setopt($ch, CURLOPT_USERAGENT, "pengo1998");
                curl_setopt($ch, CURLOPT_HTTPHEADER, array($header));
                curl_setopt($ch, CURLOPT_POST, count($fields));
                curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
                $result = curl_exec($ch);
                if($result === false) {
                    curl_error($ch);
                    curl_close($ch);
                    return false;
                }
                curl_close($ch);
                return json_decode($result);
            }
        }
        ---------------------------------------------------------
        -- login.php --
        <?php
        require("data.php");

        $state = "afsg78t6y9adsgg876ta89"; // Random-esque string set to serve as unique confirmation that request is coming from us
        $url = "https://login.eveonline.com/v2/oauth/authorize/" . "?response_type=code&redirect_uri=" . $callback . "&client_id=" . $cid . "&state=" . Sstate;
        // came back as:
        // https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=http://localhost:8005/evecallback.php&client_id=ae6b94f12d9149da898f3675d1b3f7c9&state=sk4fvlslk4lsvlksdkl43klfv

        if(headers_sent()) {
            echo '<script>window.location = ' . $url . ';</script>';
        } else {
            header("Location: " . $url);
            die();
        }
        ---------------------------------------------------------
        -- evecallback.php --
        <?php
        require("data.php");
        require("request.php");

        if(isset($_GET['code'])) {
            $code = $_GET['code'];
            $url = "https://login.eveonline.com/v2/oauth/token";
            $header = "Authorization: Basic " . base64_encode($cid . ":" . $secretkey);
            //$userAgent -- removed since his userAgent is going to be the same regardless,
            // so he set it in his "request" file and removed it from the variables in the GET() and POST() methods
            $fields_string = "";
            $fields = array(
                'grant_type' => 'authorization_code',
                'code' => $code
            );

            foreach($fields as $key => $value) {
                $fields_string .= $key . "=" . $value . "&";
            }
            rtim($fields_string, "&");

            $resp = Request::POST($header, $url, $fields, $fields_string);

            $accessToken = $resp->access_token;
            $refreshToken = $resp->refresh_token;

            // var_dump($resp);

            $url = "https://login.eveonline.com/oauth/verify";
            $header = "Authorization: Bearer " . $accessToken;

            $resp = Request::GET($header, $url);

            // var_dump($resp);

            $characterID = $resp->CharacterID;
            $characterName = $resp->CharacterName;
            $expiration = $resp->ExpiresOn;

            // The following blocks of code from line 137 through line 156 is from pengo1998's video #3 regarding how to refresh the token
            $url = "https://login.eveonline.com/v2/oauth/token";
            $header = "Content-type: application/x-www-form-urlencoded\n" . "Authorization: Basic " . base64_encode($cid . ":" . $secretKey);
            $fields_string = "";
            $fields = array(
                "grant_type" => "refresh_token",
                "refresh_token" => $refreshToken
            );
            foreach($fields as $key => $value) {
                $fields_string .= $key . "=" . $value . "&";
            }
            rtim($fields_string, "&");

            $resp = Response::POST($header, $url, $fields, $fields_string);
            if($resp === false) {
                echo "Failed to run POST request.";
                die();
            }

            var_dump($resp);
            die();
        } else {
            echo "Did not receive code from eve.";
            die();
        }
        ---------------------------------------------------------
        A successful login (Youtuber used localhost:8005) resulted in localhost:8005/evecallback.php?code=c03o_PSss0KezL8TkGxZRw&state=sk4fvlslk4lsvlksdkl43klfv
        with an object showing on the page in the following shape:
        object(stdClass)[1]
            public 'access_token' => string 'youtuber blocked out the string'
            public 'expires_in' => int 1199
            public 'token_type' => string 'Bearer' (length=6)
            public 'refresh_token' => string 'youtuber blocked out the string' (length=24)
        The above object was generated by the var_dump command the youtuber used in evecallback.php line 123 to test the results

        The var_dump command on line 130 generated the following for the Youtuber:
        object(stdClass)[2]
            public 'CharacterID' => int 1741730856
            public 'CharacterName' => string 'pengo1998' (length=9)
            public 'ExpiresOn' => string '2019-05-21T09:05:04' (length=19)
            public 'Scopes' => string '' (length=0)
            public 'TokenType' => string 'Character' (length=9)
            public 'CharacterOwnerHash' => string 'Youtuber blocked out the string' (length=28)
            public 'IntellectualProperty' => string 'EVE' (length=3)

        
        https://login.eveonline.com/account/logon?ReturnUrl=%2Foauth%2Fauthorize%2F%3Fresponse_type%3Dcode%26client_id%3D670367421c874bc382562e1addb4cb75%26redirect_uri%3Dhttps%253A%252F%252Fauth.eve-linknet.com%252Fsso%252Fcallback%26scope%3DpublicData%26state%3DFhE5ZfQoUubEw6ayPZFawIyXixZ9ZO
        https://login.eveonline.com/account/logon?ReturnUrl=%2Fv2%2Foauth%2Fauthorize%2F%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%3A%2F%2Flocalhost%3A3000%2Flogsuccess%26client_id%3Ddb266e43407749e38561264b3e22522f%26state%3Dafsg78t6y9adsgg876ta89

        %3A = :
        %26 = &
        %2F = /
        %3F = ?
        %3D = =
        what is %25, like %253A or %252F ? // Does it mean double, like :: or // ?
        Upon research, I found that %25 = %, and that %253A and %252F is an issue with the Apache server where it rewrites it as a double, but it's a mistake, so treat them as %3A and %2F respectively

        translating the 2 urls above:
        https://login.eveonline.com/account/logon?ReturnUrl=/oauth/authorize/?response_type=code&client_id=670367421c874bc382562e1addb4cb75&redirect_uri=https://auth.eve-linknet.com/sso/callback&scope=publicData&state=FhE5ZfQoUubEw6ayPZFawIyXixZ9ZO
        https://login.eveonline.com/account/logon?ReturnUrl=/v2/oauth/authorize/?response_type=code&redirect_uri=http://localhost:3000/logsuccess&client_id=db266e43407749e38561264b3e22522f&state=afsg78t6y9adsgg876ta89

        https://www.eveworkbench.com/fitting/tristan/ea67fb84-1c72-4ef8-a7f5-08d972369c17
        https://login.eveonline.com/account/logon?ReturnUrl=%2Foauth%2Fauthorize%2F%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%3A%2F%2Fwww.eveworkbench.com%2Flogin%2Feve%26client_id%3Dfab1c9460a3a4021b058b7063addaf0c%26scope%3DpublicData%2520esi-fittings.read_fittings.v1%2520esi-fittings.write_fittings.v1%2520esi-markets.read_character_orders.v1%2520esi-location.read_ship_type.v1%2520esi-skills.read_skills.v1%26state%3D%2F
        publicData
        read_fittings
        write_fittings
        read_character_orders
        read_ship_type
        read_skills
*/