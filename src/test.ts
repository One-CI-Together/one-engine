import fs from 'fs';
import axios from 'axios';


async function main() {
    // const engine = new Engine({
    //     email: {
    //         emailAddress: '',
    //         senderName: '',
    //         using: 'aws_ses',
    //         showLogs: true,
    //         awsRegion: 'sa-east-1',
    //     },
    //     storage: {
    //         bucket: 'static.oneci.com.br',
    //         region: 'us-east-1'
    //     }
    // });

    
    const _package = fs.readFileSync('wall.jpg');
    const url = 'https://s3.us-east-1.amazonaws.com/static.oneci.com.br/users/a/hero/f102ab1b-b948-4bf4-b672-014be1799de0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYHVRSZUCYBD2ZOLT%2F20230922%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230922T132348Z&X-Amz-Expires=300&X-Amz-Signature=028a07757851ae6a829868de1a15bd8cb3a092ae7cc1f3518b6d121ed1c3c011&X-Amz-SignedHeaders=host&x-id=PutObject'
    await put(url as string, _package);
}


function put(url: string, data: Buffer) {
    return axios.put(
        url,
        data,
        {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        }
    );
  }

main();