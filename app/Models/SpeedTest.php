<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpeedTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ping',
        'download',
        'upload',
        'server',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
